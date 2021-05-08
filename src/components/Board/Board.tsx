import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';

import { mainStore } from '../../stores/mainStore';

import './board.scss';

const Board = observer(() => {
    const inputElemRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mainStore.data.gameState !== 'playing') return;

        let i = setInterval(() => {
            mainStore.getRandomNum();
        }, mainStore.difficultyLevel);

        return () => clearInterval(i);
    }, [mainStore.data.gameState]);

    useEffect(() => {
        if (!inputElemRef.current) return;

        inputElemRef.current.focus();
    }, [mainStore.data.randomNum]);

    const renderButtons = () => {
        if (
            mainStore.data.gameState === 'init' ||
            mainStore.data.gameState === 'paused'
        ) {
            return (
                <Button
                    onClick={() => {
                        mainStore.data.gameState = 'playing';
                        if (!inputElemRef.current) return;
                        inputElemRef.current.focus();
                    }}
                    variant="outlined"
                    color="primary"
                >
                    Start Game
                </Button>
            );
        }
        if (mainStore.data.gameState === 'playing') {
            return (
                <>
                    <Button
                        onClick={() => (mainStore.data.gameState = 'paused')}
                        variant="outlined"
                        color="primary"
                    >
                        Pause
                    </Button>
                    <Button
                        onClick={() => {
                            mainStore.resetGame();
                            mainStore.data.gameState = 'init';
                        }}
                        variant="outlined"
                        color="secondary"
                    >
                        Restart
                    </Button>
                </>
            );
        }
    };
    return (
        <div className="Board-wrapper">
            <div className="Board-wrapper__header">
                <span className="Board-wrapper__header__buttons">
                    {renderButtons()}
                </span>
                {mainStore.data.gameState !== 'finnished' ? (
                    <h2>{mainStore.data.randomNum}</h2>
                ) : (
                    <span style={{ color: 'purple' }}>Game over!</span>
                )}
                <input
                    ref={inputElemRef}
                    placeholder="Input Letter"
                    onKeyPress={(e) => {
                        mainStore.data.keyPressed = e.key;
                    }}
                    value={mainStore.data.keyPressed}
                />
            </div>
            <div className="Board-wrapper__board">
                {Object.keys(mainStore.data.dataSet).map((item, index) => {
                    return (
                        <div
                            key={`${index}_${item}`}
                            className={`Board-wrapper__board__item ${mainStore.data.dataSet[item].status}`}
                        >
                            {`${item} ( ${mainStore.data.dataSet[item].value} )`}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
export default Board;
