export enum RenderType {
  SVGRenderer = "SVGRenderer",
  CanvasRenderer = "CanvasRenderer",
}
export enum ThemeType {
  Light = "light",
  Dark = "dark",
  Default = "default",
}
export interface AnimationType {
  enable?: boolean;
  styles?: {
    [attr: string]: string;
  };
}
export interface UseChartsOptionType {
  autoChartSize?: boolean;
  animation?: AnimationType;
  render?: RenderType;
  theme?: ThemeType;
}
