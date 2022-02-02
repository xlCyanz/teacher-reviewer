import { IVote } from "@types";

interface PropsChangeVariablesNames {
    assistence: number;
    classAgain: number;
    clarity: number;
}

const changeVariablesNames = ({ assistence, classAgain, clarity }: PropsChangeVariablesNames) => ({
  scoreAssistance: assistence,
  scoreTakeClassAgain: classAgain,
  scoreClarity: clarity,
});

const getRating = (votes: IVote[] | undefined) => {
  if (votes === undefined || !votes[0]) {
    return changeVariablesNames(
      {
        assistence: 0,
        classAgain: 0,
        clarity: 0,
      },
    );
  }

  let assistence = 0;
  let classAgain = 0;
  let clarity = 0;

  for (let index = 0; index < votes.length; index += 1) {
    const { scoreAssistance, scoreTakeClassAgain, scoreClarity } = votes[index];
    assistence += scoreAssistance * 20;
    classAgain += scoreTakeClassAgain * 20;
    clarity += scoreClarity * 20;
  }

  assistence = Math.floor(assistence / votes.length);
  classAgain = Math.floor(classAgain / votes.length);
  clarity = Math.floor(clarity / votes.length);

  return changeVariablesNames({ assistence, classAgain, clarity });
};

export default getRating;
