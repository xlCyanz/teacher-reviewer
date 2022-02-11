import { IVote } from "@types";

const getRating = (votes: IVote[]) => {
  if (votes === undefined || !votes[0]) {
    return {
      scoreAssistance: 0,
      scoreTakeClassAgain: 0,
      scoreClarity: 0,
    };
  }

  let assistence = 0;
  let classAgain = 0;
  let clarity = 0;

  votes.forEach((vote) => {
    const { scoreAssistance, scoreTakeClassAgain, scoreClarity } = vote;

    assistence += scoreAssistance * 20;
    classAgain += scoreTakeClassAgain * 20;
    clarity += scoreClarity * 20;
  });

  assistence = Math.floor(assistence / votes.length);
  classAgain = Math.floor(classAgain / votes.length);
  clarity = Math.floor(clarity / votes.length);

  return {
    scoreAssistance: assistence,
    scoreTakeClassAgain: classAgain,
    scoreClarity: clarity,
  };
};

export default getRating;
