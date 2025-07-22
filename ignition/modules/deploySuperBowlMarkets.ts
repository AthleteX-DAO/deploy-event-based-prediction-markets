import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import Web3 from "web3";

const { utf8ToHex } = Web3.utils;

export default buildModule("SuperBowl2026Markets",  (m) => {
    
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const LionsPairName = "LIONS_SuperBowl2026";
    const BillsPairName = "BILLS_SuperBowl2026";
    const collateralToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    const Lions_Market_Description = utf8ToHex(`
         title: Will the Lions win Super Bowl 2026?, 
         description: This market will resolve to "Yes" if the Detroit Lions win Super Bowl LX. Otherwise, this market will resolve to "No". If at any point it becomes impossible for this team to win the Super Bowl based on the rules of the NFL (e.g. they are eliminated in the playoff bracket), this market will resolve immediately to "No". 
        `);

    const Bills_Market_Description = utf8ToHex(`
        title: Will the Lions win Super Bowl 2026?, 
        description: This market will resolve to "Yes" if the Detroit Lions win Super Bowl LX. Otherwise, this market will resolve to "No". If at any point it becomes impossible for this team to win the Super Bowl based on the rules of the NFL (e.g. they are eliminated in the playoff bracket), this market will resolve immediately to "No". 
        `);

    const Finder ="0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64";
    
    const SuperBowl2026_Lions = m.contract("EventBasedPredictionMarket", [
        LionsPairName,
        collateralToken,
        Lions_Market_Description,
        Finder,
        ZERO_ADDRESS
    ], { id: "EventBasedPredictionMarket_Lions" });

    
    const SuperBowl2026_Bills  = m.contract("EventBasedPredictionMarket", [
        BillsPairName,
        collateralToken,
        Bills_Market_Description,
        Finder,
        ZERO_ADDRESS
    ], { id: "EventBasedPredictionMarket_Bills" });

    return { SuperBowl2026_Lions, SuperBowl2026_Bills }
});
