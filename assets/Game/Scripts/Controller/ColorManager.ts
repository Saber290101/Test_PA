import { _decorator, Component, Node, Material, Enum, Color, MeshRenderer } from 'cc';
import { BusColor, COLOR_RGB } from '../GameEnums';

const { ccclass, property } = _decorator;

Enum(BusColor);

@ccclass('ColorMaterialMapping')
export class ColorMaterialMapping {
    @property({ type: Enum(BusColor), tooltip: 'Màu xe / Hành khách' })
    public color: BusColor = BusColor.RED;

    @property({ type: Material, tooltip: 'Vật liệu tương ứng' })
    public material: Material | null = null;
}

@ccclass('ColorManager')
export class ColorManager extends Component {

    private static _inst: ColorManager | null = null;
    public static get instance(): ColorManager | null { return ColorManager._inst; }

    @property({ type: [ColorMaterialMapping], tooltip: 'Danh sách Material xe buýt tương ứng với từng Màu' })
    public colorMaterials: ColorMaterialMapping[] = [];

    @property({ type: [ColorMaterialMapping], tooltip: 'Danh sách Material stickman tương ứng với từng Màu (riêng biệt với xe)' })
    public stickmanMaterials: ColorMaterialMapping[] = [];

    @property({ tooltip: 'Sinh ngẫu nhiên màu xe và khách dựa trên danh sách màu đã kéo' })
    public randomizeColors: boolean = false;

    onLoad(): void {
        ColorManager._inst = this;
    }

    onDestroy(): void {
        if (ColorManager._inst === this) {
            ColorManager._inst = null;
        }
    }

    public getMaterialForColor(color: BusColor): Material | null {
        const mapping = this.colorMaterials.find(m => m.color === color);
        return mapping ? mapping.material : null;
    }

    public getStickmanMaterial(color: BusColor): Material | null {
        const mapping = this.stickmanMaterials.find(m => m.color === color);
        return mapping ? mapping.material : null;
    }

    public getRandomConfiguredColor(): BusColor {
        if (this.colorMaterials.length === 0) {
            const allColors = [BusColor.RED, BusColor.BLUE, BusColor.YELLOW, BusColor.GREEN, BusColor.PURPLE];
            return allColors[Math.floor(Math.random() * allColors.length)];
        }
        const randIdx = Math.floor(Math.random() * this.colorMaterials.length);
        return this.colorMaterials[randIdx].color;
    }

    public applyColorToNode(root: Node, color: BusColor): void {
        const customMat = this.getMaterialForColor(color);
        this._applyMaterialOrFallback(root, color, customMat);
    }

    public applyStickmanColor(root: Node, color: BusColor): void {
        const stickmanMat = this.getStickmanMaterial(color);
        if (stickmanMat) {
            this._applyMaterialOrFallback(root, color, stickmanMat);
        } else {
            this.applyColorToNode(root, color);
        }
    }

    private _applyMaterialOrFallback(root: Node, color: BusColor, material: Material | null): void {
        const shadowNodes = ['Vehicle_04_S', 'Vehicle_06_S', 'Vehicle_10_S'];
        const allRenderers = root.getComponentsInChildren(MeshRenderer);

        if (material) {
            for (const mr of allRenderers) {
                if (shadowNodes.includes(mr.node.name)) continue;
                if (mr.sharedMaterials.length > 0) mr.setMaterial(material, 0);
            }
        } else {
            const cd = COLOR_RGB[color];
            if (!cd) return;

            const bodyColor = new Color(cd.r, cd.g, cd.b, 255);
            const outlineColor = new Color(
                Math.max(0, cd.r - 80),
                Math.max(0, cd.g - 80),
                Math.max(0, cd.b - 80),
                255,
            );

            for (const mr of allRenderers) {
                // Bỏ qua các node chứa shadow cố định
                if (shadowNodes.includes(mr.node.name)) continue;

                const passCount = mr.sharedMaterials.length;

                // Pass 0: body (mainColor)
                const mat0 = mr.getMaterialInstance(0);
                if (mat0) {
                    try { mat0.setProperty('mainColor', bodyColor); } catch (_) { }
                }

                // Pass 3: outline (baseColor)
                if (passCount >= 4) {
                    const mat3 = mr.getMaterialInstance(3);
                    if (mat3) {
                        try { mat3.setProperty('baseColor', outlineColor); } catch (_) { }
                    }
                }
            }
        }
    }
}
