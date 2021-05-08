import React from 'react';
import { observer } from 'mobx-react-lite';
import { mainStore } from '../../stores/mainStore';

import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';

import './sidebar.scss';

const Sidebar = observer(() => {
    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val: 'easy' | 'medium' | 'hard' | any = e.target.value;
        mainStore.data.level = val;
    };

    return (
        <div className="Sidebar-wrapper">
            <h3 className="Sidebar-wrapper__title">Reflex Game</h3>

            <FormControl
                disabled={mainStore.data.game_state !== 'init'}
                component="fieldset"
                className="Sidebar-wrapper__levels"
            >
                <FormLabel component="legend">
                    Choose Difficulty Level
                </FormLabel>
                <RadioGroup
                    aria-label="difficulty"
                    name="difficulty"
                    value={mainStore.data.level}
                    onChange={handleLevelChange}
                >
                    <FormControlLabel
                        value="easy"
                        control={<Radio />}
                        label="easy"
                    />
                    <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label="medium"
                    />
                    <FormControlLabel
                        value="hard"
                        control={<Radio />}
                        label="hard"
                    />
                </RadioGroup>
            </FormControl>
            <div className="Sidebar-wrapper__info">
                <h4>SCORE</h4>
                <p className="Sidebar-wrapper__info__hit">
                    {`HIT:  ${mainStore.data.correctCount}`}
                </p>
                <p className="Sidebar-wrapper__info__miss">
                    {`MISSED:  ${mainStore.data.missedCount}`}
                </p>
                <p className="Sidebar-wrapper__info__left">
                    {` LEFT:  ${
                        Object.keys(mainStore.data.dataSet).length -
                        (mainStore.data.correctCount +
                            mainStore.data.missedCount)
                    }`}
                </p>
            </div>
        </div>
    );
});
export default Sidebar;
