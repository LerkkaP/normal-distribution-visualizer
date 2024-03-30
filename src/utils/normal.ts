export function normal(mean: number, sigma: number) {
    let x, y, rds
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds === 0 || rds > 1);
    const c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return mean + x * sigma * c; // throw away extra sample y * c
}
