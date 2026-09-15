import { env } from 'cloudflare:workers';
import { ApiError, chooseModel, parseInput, perform } from '@/lib/ai-service';
import { clarificationFor } from '@/lib/grammar-safety';

export async function POST(request:Request){
  const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  try{
    const input=await parseInput(request);
    if(input.action==='grammar'){
      const clarification=clarificationFor(input.text);
      if(clarification)return Response.json(clarification,{headers});
    }
    const settings=env as unknown as Record<string,string|undefined>;
    const key=(request.headers.get('x-careermate-key')||settings.GEMINI_API_KEY||'').trim();
    if(!key)throw new ApiError(503,'Gemini is not connected. Use Connect Gemini to enter your API key.');
    if(!/^[A-Za-z0-9_-]{20,200}$/.test(key))throw new ApiError(401,'Invalid API key format.');
    const model=await chooseModel(key,settings.GEMINI_MODEL,input.action==='connect');
    if(input.action==='connect')return Response.json({connected:true,model},{headers});
    return Response.json(await perform(input.action,input.parts,key,model),{headers});
  }catch(error){
    const known=error instanceof ApiError;
    return Response.json({error:known?error.message:'Unable to process this request. Please retry.'},{status:known?error.status:500,headers});
  }
}
