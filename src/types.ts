export interface Data {
    q: number;
    p: number;
}

export interface RequestData {
    value?: number;
    value_lower?: number;
    value_upper?: number;
    mean: number;
    sd: number;
}

export interface ClipBoard extends ApiBaseProps {
    label: string
    zBelow: number;
    zAbove: number;
    zBetweenBelow: number;
    zBetweenAbove: number;
}

export interface ApiBaseProps {
    mean: number;
    sd: number;
}

export interface ApiPropsSingle extends ApiBaseProps {
    value: number;
}

export interface ApiPropsDouble extends ApiBaseProps {
    value_lower: number;
    value_upper: number;
}

export interface CardProps {
    label: string;
    value: string;
    selectedArea: string;
    handleCardClick: (value: string) => void;
    children: ReactNode;
  }