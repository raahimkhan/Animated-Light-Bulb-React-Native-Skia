import { Dimensions } from 'react-native';

// width and height of mobile device
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// center of mobile device horizontally and vertically
export const centerX = screenWidth / 2;
export const centerY = screenHeight / 2;

// light bulb svg paths
export const lightBulbPaths = {
  /*
    M = move to (centerX, 20), i.e., start point of the thread at top center
    L = draw line down to (centerX, 150), i.e., extended thread length
  */
  hangingThread: `
    M${centerX} 20
    L${centerX} 150
  `,

  /*
    M = move to top-left corner (centerX - 15, 150)
    H = horizontal line to right edge (centerX + 15)
    V = vertical line down to bottom (175)
    H = horizontal line back to left edge (centerX - 15)
    Z = close path to starting point, completing the rectangle
    it is basically the rectangular shape where the thread ends
  */
  screwBase: `
    M${centerX - 15} 150
    H${centerX + 15}
    V175
    H${centerX - 15}
    Z
  `,

  /*
    M = move to left edge at different vertical positions
    L = draw horizontal line to right edge at same vertical position
    these are the 3 horizontal lines within the screwBase
  */
  lines: {
    line1: `M${centerX - 15} 155 L${centerX + 15} 155`,
    line2: `M${centerX - 15} 160 L${centerX + 15} 160`,
    line3: `M${centerX - 15} 165 L${centerX + 15} 165`,
    line4: `M${centerX - 15} 170 L${centerX + 15} 170`,
  },

  /*
    glass bulb shape (closed path using cubic bezier curves)
    M = move to right side starting point of bulb
    C = cubic bezier curves forming smooth outline of bulb clockwise
    Z = closes the path to form a filled shape
  */
  glassBulb: `
    M${centerX + 35} 210
    C${centerX + 35} 188.26 ${centerX + 24.04} 170 ${centerX} 170
    C${centerX - 24.04} 170 ${centerX - 35} 188.26 ${centerX - 35} 210
    C${centerX - 35} 231.74 ${centerX - 24.04} 250 ${centerX} 250
    C${centerX + 24.04} 250 ${centerX + 35} 231.74 ${centerX + 35} 210
    Z
  `,

  /*
    filament inside bulb (quadratic bezier curves)
    M = move to left start point inside bulb
    Q = quadratic bezier curves creating loops representing filament wire
  */
  filament: `
    M${centerX - 10} 195
    Q${centerX} 205 ${centerX + 10} 195
    Q${centerX} 215 ${centerX - 10} 205
    Q${centerX} 225 ${centerX + 10} 215
  `,
};
