export function gaussian(x, mean: number, sigma: number) {
    const gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-0.5 * x * x) / sigma;
}