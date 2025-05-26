import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Canvas,
    Path,
    Circle,
    Blur,
    Paragraph,
    TextAlign,
    Skia,
    Group,
} from "@shopify/react-native-skia";
import { lightBulbPaths } from "@utilities/lightBulbPaths";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { screenWidth, centerX } from '@utilities/lightBulbPaths';
import { StatusBar } from 'expo-status-bar';

const AnimatedLightBulb: React.FC = () => {

    /*
        - max rotation angle for the bulb and thread is 30 degress
        - it will rotate from pivot point (centerX, 20) to 30 degrees on either side
    */
    const MAX_ANGLE = Math.PI / 6;
    const [rotationAngle, setRotationAngle] = useState<number>(0);

    useEffect(() => {
        /*
            - record the start time when the effect runs
            - this is used as a reference point to calculate elapsed time on each frame
            - this ensures the pendulum swings smoothly based on how much time has passed
        */
        let start = Date.now();
        let animationFrameId: number;
        const frame = () => {
            // calculate the elapsed time in seconds since start
            const elapsed = (Date.now() - start) / 1000;
            /*
                - calculate the pendulum angle using sine wave oscillation
                - MAX_ANGLE is the maximum swing angle in radians (30 degrees)
                - frequency is 0.3 Hz (one full swing every 2 seconds)
            */
            const angle = MAX_ANGLE * Math.sin(elapsed * 2 * Math.PI * 0.3);
            setRotationAngle(angle);
            // request the next animation frame and save its ID
            animationFrameId = requestAnimationFrame(frame);
        };
        // start the animation loop
        animationFrameId = requestAnimationFrame(frame);
        // cleanup function to cancel the animation when component unmounts
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const [bulbOn, setBulbOn] = useState<boolean>(false);

    const toggleBulb = useCallback(() => {
        setBulbOn(bulbIsOn => !bulbIsOn);
    }, []);

    const getBulbColor = useCallback(() => {
        if (bulbOn) {
            return "yellow";
        }
        return "white";
    }, [bulbOn]);

    const getTextColor = useCallback(() => {
        if (bulbOn) {
            return "white";
        }
        return "gray";
    }, [bulbOn]);

    const tap = Gesture.Tap().onStart(() => {
        /*
            - gestures happen on UI thread
            - function is on the JS thread
            - runOnJS safely calls the JS function from inside the UI gesture
        */
        runOnJS(toggleBulb)();
    });

    const paragraph = useMemo(() => {
        const paragraphStyle = {
            textAlign: TextAlign.Left
        };
        const textStyle = {
            color: Skia.Color(getTextColor()),
            fontSize: 25,
        };
        return Skia.ParagraphBuilder.Make(paragraphStyle)
            .pushStyle(textStyle)
            .addText("How many software")
            .addText(" developers does it take to")
            .addText(" change a light bulb?")
            .addText("\n \n")
            .addText("None...!")
            .addText("\n \n")
            .addText("That is a hardware problem")
            .addText("\n \n")
            .addText("- Muhammad Raahim Khan")
            .pop()
            .build();
    }, [bulbOn]);

    return (
        <GestureHandlerRootView>
            <StatusBar style="dark" />
            <GestureDetector gesture={tap}>
                <Canvas style={styles.canvas}>
                    <Group
                        // pivot point from where the bulb thread starts
                        origin={{ x: centerX, y: 20 }}
                        // rotate the bulb and thread around the pivot point
                        transform={[{ rotate: rotationAngle }]}
                    >
                        <Path path={lightBulbPaths.hangingThread} color="white" style="stroke" strokeWidth={2} />
                        <Path path={lightBulbPaths.screwBase} color={getBulbColor()} style="fill" />
                        <Path path={lightBulbPaths.lines.line1} color="black" style="stroke" strokeWidth={1} />
                        <Path path={lightBulbPaths.lines.line2} color="black" style="stroke" strokeWidth={1} />
                        <Path path={lightBulbPaths.lines.line3} color="black" style="stroke" strokeWidth={1} />
                        <Path path={lightBulbPaths.lines.line4} color="black" style="stroke" strokeWidth={1} />
                        <Path path={lightBulbPaths.glassBulb} color={getBulbColor()} style="fill" />
                        {bulbOn && (
                            <Circle cx={centerX} cy={210} r={200} color="rgba(255, 255, 0, 0.3)">
                                <Blur blur={40} />
                            </Circle>
                        )}
                        <Path path={lightBulbPaths.filament} color="black" style="stroke" strokeWidth={1.5} opacity={0.7} />
                    </Group>
                    <Paragraph
                        paragraph={paragraph}
                        x={50}
                        y={280} // start below where the bulb ends (vertically)
                        width={screenWidth - 100}
                    />
                </Canvas>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default AnimatedLightBulb;