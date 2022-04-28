import {Exp,LetExp,isPrimOp,isVarRef,LitExp,isStrExp,isNumExp,isBoolExp,,AppExp,VarDecl,Binding,ProcExp,LetStarExp,isLetStarExp, Program, isProgram, isExp, makeProgram, isCExp, makeDefineExp, isDefineExp, isAtomicExp, isIfExp, isLitExp, CExp, makeIfExp, isAppExp, makeAppExp, makeProcExp, isLetExp, isProcExp, makeLetExp, makeLetStarExp} from "./L31-ast";
import { Result, makeFailure,makeOk } from "../shared/result";
import { map, pipe, zipWith } from "ramda";
import {valueToString,isEmptySExp,isSymbolSExp,isCompoundSExp} from "../imp/L3-value";

/*
Purpose: Transform L3 AST to JavaScript program string
Signature: l30ToJS(l2AST)
Type: [EXP | Program] => Result<string>
*/

// const unparseLitExp = (le: LitExp): string =>
//     isEmptySExp(le.val) ? `'()` :
//     isSymbolSExp(le.val) ? `'${valueToString(le.val)}` :
//     isCompoundSExp(le.val) ? `'${valueToString(le.val)}` :
//     `${le.val}`;


export const unparseL31 = (exp: Program | Exp): string =>
    isBoolExp(exp) ? valueToString(exp.val) :
    isNumExp(exp) ? valueToString(exp.val) :
    isStrExp(exp) ? valueToString(exp.val) :
    isLitExp(exp) ? unparseLitExp(exp) :
    isVarRef(exp) ? exp.var :
    isProcExp(exp) ? unparseProcExp(exp) :
    isIfExp(exp) ? `(if ${unparseL31(exp.test)} ${unparseL31(exp.then)} ${unparseL31(exp.alt)})` :
    isAppExp(exp) ? `(${unparseL31(exp.rator)} ${unparseLExps(exp.rands)})` :
    isPrimOp(exp) ? exp.op :
    isLetExp(exp) ? unparseLetExp(exp) :
    isDefineExp(exp) ? `(define ${exp.var.var} ${unparseL31(exp.val)})` :
    isProgram(exp) ? `(L31 ${unparseLExps(exp.exps)})` :
    exp;

const unparseLExps = (les: Exp[]): string =>
    map(unparseL31, les).join(" ");

const unparseProcExp = (pe: ProcExp): string => 
    `(lambda (${map((p: VarDecl) => p.var, pe.args).join(",")}) ${unparseLExps(pe.body)})`


const unparseLetExp = (le: LetExp) : string => 
    `((${map((b: Binding) => b.var.var, le.bindings).join(",")}) => ${unparseLExps(le.body)}) (${map((b: Binding) => b.val, le.bindings).join(",")})`

export const l30ToJS = (exp: Exp | Program): Result<string>  => 
    makeFailure("TODO");


