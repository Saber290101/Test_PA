/**
 * Bus Away - Game Enums & Constants
 * Cocos Creator 3.8.4
 */

import { Color } from 'cc';

/** Màu sắc xe buýt và hành khách */
export enum BusColor {
    RED = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    PURPLE = 4,
}

/** Trạng thái game */
export enum GameState {
    IDLE = 0,
    PLAYING = 1,
    WIN = 2,
    LOSE = 3,
}

/** Trạng thái xe buýt */
export enum BusState {
    PARKED,     // Đang đậu trong lane, chờ tap
    ENTERING,   // Đi thẳng vào đường, chờ đến gate (WP_0)
    RUNNING,    // Chạy theo waypoints
    PICKING,    // Dừng tại bến, đón khách
    EXITING,    // Đầy → rời khỏi đường
    RETURNING,  // Chưa đầy, hết vòng → quay về lane
}

/** RGB color data cho mỗi BusColor */
export interface ColorData {
    r: number;
    g: number;
    b: number;
    name: string;
}

export const COLOR_RGB: { [key: number]: ColorData } = {
    [BusColor.RED]:    { r: 231, g: 76,  b: 60,  name: 'Red' },
    [BusColor.BLUE]:   { r: 52,  g: 152, b: 219, name: 'Blue' },
    [BusColor.YELLOW]: { r: 241, g: 196, b: 15,  name: 'Yellow' },
    [BusColor.GREEN]:  { r: 46,  g: 204, b: 113, name: 'Green' },
    [BusColor.PURPLE]: { r: 155, g: 89,  b: 182, name: 'Purple' },
};

/** Helper: chuyển BusColor thành cc.Color */
export function busColorToCC(busColor: BusColor): Color {
    const d = COLOR_RGB[busColor];
    return new Color(d.r, d.g, d.b, 255);
}

/** Helper: tạo màu tối hơn */
export function darkenColor(c: Color, amount: number = 40): Color {
    return new Color(
        Math.max(0, c.r - amount),
        Math.max(0, c.g - amount),
        Math.max(0, c.b - amount),
        255,
    );
}

/** Helper: tạo màu sáng hơn */
export function lightenColor(c: Color, amount: number = 40): Color {
    return new Color(
        Math.min(255, c.r + amount),
        Math.min(255, c.g + amount),
        Math.min(255, c.b + amount),
        255,
    );
}
