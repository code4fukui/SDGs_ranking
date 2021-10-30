import { scrapeCSV } from "https://js.sabae.cc/scrapeCSV.js";
//import { htmltable2json } from "https://js.sabae.cc/htmltable2json.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { JAPAN_PREF } from "https://js.sabae.cc/JAPAN_PREF.js";

const url = "https://project.nikkeibp.co.jp/atclppp/PPP/report/090200284/?P=2";
//await scrapeCSV(url);
//const data = await htmltable2json(url);
const d1 = CSV.toJSON(await CSV.fetch("1.csv"));
d1.pop();
console.log(d1);
const keys1 = Object.keys(d1[0]);
const nm1 = keys1[0];
const name1 = nm1.substring(0, nm1.length - 2) + keys1[2];

const d2 = CSV.toJSON(await CSV.fetch("2.csv"));
d2.pop();
const keys2 = Object.keys(d2[0]);
const nm2 = keys2[0];
const name2 = "SDGs" + nm2.substring(0, nm2.length - 2) + keys2[2];
//console.log(name1, name2);
//console.log(d2);

const data2 = JAPAN_PREF.map(pref => {
  const res = {};
  res["都道府県名"] = pref;
  res[name1] = d1.find(n => n.都道府県名 == pref).スコア;
  res[name2] = d2.find(n => n.都道府県名 == pref).スコア;
  return res;
});
console.log(data2);

await Deno.writeTextFile("sdgs-ranking-japan.csv", CSV.stringify(data2));
