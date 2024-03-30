import { normal } from "./normal";
import { gaussian } from "./gaussian";
import { Data } from "../types";

export const generateData = (mean: number, sigma: number) => {
    const data: Data[] = [];
    for (let i = 0; i < 100000; i++) {
        const q = normal(mean, sigma);
        const p = gaussian(q, mean, sigma);
        
        data.push({ q, p});
    }
    data.sort((a, b) => a.q - b.q);
    return data;
}

