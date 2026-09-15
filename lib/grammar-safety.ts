import type { GrammarResult } from './ai-contract';

export function clarificationFor(text: string): GrammarResult | null {
  if (/\bwont\b/i.test(text)) return {
    corrected: text, changes: [], explanation: 'Original kept until you confirm the intended meaning.',
    clarification: 'Does “wont” mean “want” (chahte ho), “won’t” (nahi karoge), or the word “wont” meaning accustomed? Edit the word below and check again.',
  };
  return null;
}

function negations(text:string) {
  return (text.toLowerCase().replace(/[’‘]/g,"'").replace(/\b(cannot|can't|won't|shan't)\b/g,' not ').replace(/\b[a-z]+n't\b/g,' not ').match(/\b(not|never|no|neither|nor|without)\b/g)||[]).sort().join('|');
}
export function preserveMeaning(original:string,result:GrammarResult):GrammarResult {
  const numbers=(text:string)=>(text.match(/\d+(?:[.,]\d+)*/g)||[]).join('|');
  const invalidChanges=result.changes.some(change=>change.original&&!original.includes(change.original));
  if(result.clarification||negations(original)!==negations(result.corrected)||numbers(original)!==numbers(result.corrected)||invalidChanges){
    return {corrected:original,changes:[],explanation:'No correction applied because the intended meaning needs review.',clarification:result.clarification||'The proposed correction may change a number, negation, or unsupported phrase. Please clarify your intended meaning and check again.'};
  }
  return result;
}
