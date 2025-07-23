// ignition/modules/SuperBowl2026Markets.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import Web3 from "web3";

const { utf8ToHex } = Web3.utils;

type Team = {
  key: string;         // UPPERCASE short key for IDs / pair names
  nickname: string;    // For the title question
  fullName: string;    // City + Team for the description
};

const TEAMS: Team[] = [

  { key: "TEXANS",       nickname: "Texans",       fullName: "Houston Texans" },
  { key: "COLTS",        nickname: "Colts",        fullName: "Indianapolis Colts" },
  { key: "JAGUARS",      nickname: "Jaguars",      fullName: "Jacksonville Jaguars" },
  { key: "TITANS",       nickname: "Titans",       fullName: "Tennessee Titans" },

  { key: "BRONCOS",      nickname: "Broncos",      fullName: "Denver Broncos" },
  { key: "CHIEFS",       nickname: "Chiefs",       fullName: "Kansas City Chiefs" },
  { key: "RAIDERS",      nickname: "Raiders",      fullName: "Las Vegas Raiders" },
  { key: "CHARGERS",     nickname: "Chargers",     fullName: "Los Angeles Chargers" },
];

export default buildModule("SuperBowl2026Markets", (m) => {
  const ZERO_ADDRESS   = "0x0000000000000000000000000000000000000000";
  const collateralToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC on Polygon, from your snippet
  const Finder          = "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64";

  const makeDescription = (nickname: string, fullName: string) =>
    utf8ToHex(`
         title: Will the ${nickname} win Super Bowl 2026?, 
         description: This market will resolve to "Yes" if the ${fullName} win Super Bowl LX. Otherwise, this market will resolve to "No". If at any point it becomes impossible for this team to win the Super Bowl based on the rules of the NFL (e.g. they are eliminated in the playoff bracket), this market will resolve immediately to "No".
    `);

  const contracts: Record<string, any> = {};

  for (const t of TEAMS) {
    const pairName = `${t.key}_SuperBowl2026`;
    const marketDescription = makeDescription(t.nickname, t.fullName);

    const contract = m.contract(
      "EventBasedPredictionMarket",
      [pairName, collateralToken, marketDescription, Finder, ZERO_ADDRESS],
      { id: `EventBasedPredictionMarket_${t.key}` }
    );

    // Expose each contract with a readable key
    contracts[`SuperBowl2026_${t.key}`] = contract;
  }

  return contracts;
});
