/* eslint-disable */
import { makeAutoObservable } from 'mobx';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

interface field_t {
    status: 'active' | 'missed' | 'correct';
    value: number;
}
interface game_data_t {
    gameState: 'init' | 'playing' | 'paused' | 'finnished';
    level: 'easy' | 'medium' | 'hard';
    dataSet: {
        [key: string]: field_t;
    };
    randomNum: number | null;
    keyPressed: string;
    correctCount: number;
    missedCount: number;
    leftCount: number;
}
class MainStore {
    constructor() {
        makeAutoObservable(this);
    }

    data: game_data_t = {
        gameState: 'init',
        level: 'medium',
        randomNum: this.number,
        dataSet: {
            'a': { status: 'active', value: 1 },
            'b': { status: 'active', value: 2 },
            'c': { status: 'active', value: 3 },
            'd': { status: 'active', value: 4 },
            'e': { status: 'active', value: 5 },
            'f': { status: 'active', value: 6 },
            'g': { status: 'active', value: 7 },
            'h': { status: 'active', value: 8 },
            'i': { status: 'active', value: 9 },
            'j': { status: 'active', value: 10 },
            'k': { status: 'active', value: 11 },
            'l': { status: 'active', value: 12 },
            'm': { status: 'active', value: 13 },
            'n': { status: 'active', value: 14 },
            'o': { status: 'active', value: 15 },
            'p': { status: 'active', value: 16 },
            'q': { status: 'active', value: 17 },
            'r': { status: 'active', value: 18 },
            's': { status: 'active', value: 19 },
            't': { status: 'active', value: 20 },
            'u': { status: 'active', value: 21 },
            'v': { status: 'active', value: 22 },
            'w': { status: 'active', value: 23 },
            'x': { status: 'active', value: 24 },
            'y': { status: 'active', value: 25 },
            'z': { status: 'active', value: 26 },
        },
        keyPressed: '',
        correctCount: 0,
        missedCount: 0,
        leftCount: 0,
    };

    get difficultyLevel():number  {
        switch (this.data.level) {
            case 'easy':
                return 5000;
            case 'medium':
                return 3500;
            case 'hard':
                return 2000;
            default:
                return 3500
          }
    }

    get number():number  {
       const numbers = Array.from(Array(10).keys())
       return numbers[Math.floor(Math.random() * numbers.length)]
    }
    
    getRandomNum() {
        mainStore.checkLetter(mainStore.data.keyPressed);
        mainStore.data.keyPressed = '';
        let numList = [];

        for (const [key, value] of Object.entries(this.data.dataSet)) {
            if (value.status === 'active') {
                numList.push(value.value);
            }
        }
        if (numList.length > 0) {
            this.data.randomNum =
                numList[Math.floor(Math.random() * numList.length)];
        } else {
            this.data.gameState = 'finnished';
            this.data.randomNum = null;
        }
    }

    resetGame() {
        for (const [key, value] of Object.entries(this.data.dataSet)) {
            value.status = 'active';
        }
        this.data.correctCount = 0;
        this.data.missedCount = 0;
        this.data.leftCount = 0;
    }

    checkLetter(param: string) {
        if (
            this.data.dataSet[param] !== undefined &&
            this.data.dataSet[param].value === this.data.randomNum
        ) {
            this.data.dataSet[param].status = 'correct';
            this.data.correctCount++;
        } else {
            for (const [key, value] of Object.entries(this.data.dataSet)) {
                if (value.value === this.data.randomNum) {
                    value.status = 'missed';
                }
            }
            this.data.missedCount++;
        }
    }
}

export let mainStore = new MainStore();
export let mainData = mainStore.data;
