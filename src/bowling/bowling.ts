export function score(rolls: number[]): number {
    return  rolls.reduce((total: number, roll: number) => total + roll, 0);
}

export function scoreOneSpare(rolls: number[]): number {
    let total = 0;
    let i= 0;
    for (let frame = 0; frame < 10 ; frame++){
        const first =rolls[i] ?? 0;
        const second= rolls[i + 1] ?? 0;
        
        if(first + second === 10){
            const bonus = rolls[i + 2] ?? 0;
            total += first + second + bonus;
        }else{
            total += first + second;
        }
        i += 2;
    }
    return total;

}
export function scoreOneStrike(rolls: number[]): number {
    let total = 0;
    let i = 0;
    for (let frame = 0; frame < 10; frame++) {
        const first = rolls[i] ?? 0;
        const second = rolls[i + 1] ?? 0;
        const third = rolls[i + 2] ?? 0;
        if (first === 10) {
            total += first + second + third;
            i += 1; 
        }else {
            total += first + second;
            i += 2; 
        }
    }
    return total;

}

export function scorePerfectGame(rolls: number[]): number {

let total = 0;
    for (let frame = 0; frame < 10; frame++) {
        const first = rolls[frame] ?? 0;
        const second = rolls[frame + 1] ?? 0;
        const third = rolls[frame + 2] ?? 0;
        if (first === 10) {
            total += first + second + third;
        }
    }
    return total;
}
