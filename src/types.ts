export interface Data {
    q: number;
    p: number;
}

export interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
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