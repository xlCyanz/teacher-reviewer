import { Vote } from "../../types/index";

function changeVariablesNames(obj: {assistence: number, classAgain:number, clarity:number}) {
  return {
    scoreAssistance: obj.assistence,
    scoreTakeClassAgain: obj.classAgain,
    scoreClarity: obj.clarity,
  };
}

export default function getRating(votes: Vote[] | undefined) {
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

  for (let index = 0; index < votes.length; index + 1) {
    const { scoreAssistance, scoreTakeClassAgain, scoreClarity } = votes[index];
    assistence += scoreAssistance * 20;
    classAgain += scoreTakeClassAgain * 20;
    clarity += scoreClarity * 20;
  }
  assistence = Math.floor(assistence / votes.length);
  classAgain = Math.floor(classAgain / votes.length);
  clarity = Math.floor(clarity / votes.length);
  return changeVariablesNames({ assistence, classAgain, clarity });
}
