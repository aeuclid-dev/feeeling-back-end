import React from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

interface checkScoreDataType {
  lang: string;
  psy_check_id: number;
  psy_check_score_id: number;
  score: number;
  score_desc: string;
  score_item: string;
  score_seq: number;
}

interface questionScoreDataType {
  categoryId: string;
  checkScore: Array<checkScoreDataType>;
  check_category: string;
  check_desc: string;
  check_item: string;
  check_seq: number;
  lang: string;
  psy_check_id: number;
  test_id: number;
  user_YN: string;
  checkScoreSelect?: number;
}
type QuestionsProps = {
  data: questionScoreDataType;
  onClick: (psy_check_id: number, psy_check_score_id: number) => void;
  validata: Array<number>;
};
function Questions({ data, onClick, validata }: QuestionsProps) {
  const object: questionScoreDataType = data;
  const validateArray: Array<number> = validata;
  if (object && object !== null && object !== undefined) {
    return (
      <div
        style={{
          background:
            validateArray && validateArray.includes(object.psy_check_id)
              ? '#ffa3c0'
              : '#FFF',
        }}
      >
        <p>
          Q {object.check_seq}. {object.check_desc}
        </p>
        <p>{object.check_item}</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {object.checkScore.map((scoreData, index) => {
            return (
              <div
                key={
                  scoreData.psy_check_id +
                  '' +
                  scoreData.psy_check_score_id +
                  '' +
                  index
                }
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Radio
                  checked={
                    object.checkScoreSelect === scoreData.psy_check_score_id
                  }
                  id={
                    scoreData.psy_check_id + '' + scoreData.psy_check_score_id
                  }
                  onChange={(e) => {
                    //console.log('question tsx inside onchange function...');
                    onClick(
                      scoreData.psy_check_id,
                      scoreData.psy_check_score_id,
                    );
                  }}
                  value={scoreData.psy_check_id + '' + scoreData.score}
                  name={`Q${object.check_seq}`}
                  inputProps={{ 'aria-label': scoreData.score_item }}
                />
                <label
                  htmlFor={
                    scoreData.psy_check_id + '' + scoreData.psy_check_score_id
                  }
                >
                  {scoreData.score_item}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Questions;
