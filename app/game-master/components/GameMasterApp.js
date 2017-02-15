import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import Puzzle from 'common/components/puzzle/puzzle';
import PlaceholderCountdown from 'common/components/placeholder-countdown/placeholder-countdown';

function chooseOverlay(connected) {
    if (!connected) {
        return <OverlayWelcome />;
    }

    return null;
}

function chooseTaskPlaceholder(roundPhase, roundInput, roundExpected, countdownRemaining) {
    if (roundPhase === 'countdown') {
        return <PlaceholderCountdown value={countdownRemaining} />;
    }

    return <Puzzle input={roundInput} expected={roundExpected} />;
}

class GameMasterApp extends Component {
    render({ participant, connected, puzzles, currentRoundIndex, roundRemaining, roundDuration, roundName, roundInput, roundExpected, roundPhase, countdownRemaining }) {
        const overlay = chooseOverlay(connected);
        const taskPlaceholder = chooseTaskPlaceholder(roundPhase, roundInput, roundExpected, countdownRemaining);

        return (
            <div className="game-master-view">
                <UserPanel displayName={participant.displayName} role={participant.role} />
                <div className="view-content">
                    <GameProgress rounds={puzzles} currentRoundIndex={currentRoundIndex} />
                    <div className="main-content">
                        <div class="task-column">
                            <div className="task-header">
                                <div className="task-controls">
                                    <div className="round-name">{roundName}</div>
                                    <div>CONTROLS</div>
                                </div>
                                <Timer radius={40} strokeWidth={5} value={roundRemaining} maxValue={roundDuration}  />
                            </div>
                            {taskPlaceholder}
                        </div>
                        <div class="participants-column"></div>
                    </div>
                </div>
                {overlay}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        participant: state.participant,
        connected: state.session.connected,
        puzzles: state.session.puzzles,
        currentRoundIndex: state.session.currentRoundIndex,
        roundName: state.currentRound.name,
        roundRemaining: state.currentRound.remaining,
        roundDuration: state.currentRound.duration,
        roundPhase: state.currentRound.phase,
        roundInput: state.currentRound.input,
        roundExpected: state.currentRound.expected,
        countdownRemaining: state.currentRound.countdownRemaining,
    };
})(GameMasterApp);