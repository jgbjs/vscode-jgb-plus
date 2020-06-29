import *  as IConfig from "./IConfiguration";

export function escapeRegExp(input: string): string {
  return input
}

const xmlConfig = {
  foldEnd: "<!-- @endif -->",
  foldEndRegex: "\\<!--[\\s]*@endif",
  foldStart: "<!-- @if [NAME] -->",
  foldStartRegex: "\\<!--[\\s]*@if"
}

const jsConfig = {
  foldEnd: "/* @endif */",
  foldEndRegex: "(\\/\\/|\\/\\*)[\\s]*@endif",
  foldStart: "/* @if [NAME] */",
  foldStartRegex: "^[\\s]*(\\/\\/|\\/\\*)[\\s]*@if"
}

const cssConfig = {
  foldEnd: "/* @endif */",
  foldEndRegex: "(\\/\\/|\\/\\*)[\\s]*@endif",
  foldStart: "/* @if [NAME] */",
  foldStartRegex: "^[\\s]*(\\/\\/|\\/\\*)[\\s]*@if"
}

const jsonConfig = {
  foldEnd: "/* @endif */",
  foldEndRegex: "(\\/\\/|\\/\\*)[\\s]*@endif",
  foldStart: "/* @if [NAME] */",
  foldStartRegex: "^[\\s]*(\\/\\/|\\/\\*)[\\s]*@if"
}

export let DefaultConfiguration: IConfig.IConfiguration = {
  "[css]": cssConfig,
  "[less]": cssConfig,
  "[sass]": cssConfig,
  "[scss]": cssConfig,
  "[html]": xmlConfig,
  "[wxml]": xmlConfig,
  "[xml]": xmlConfig,
  "[javascript]": jsConfig,
  "[javascriptreact]": jsConfig,
  "[typescript]": jsConfig,
  '[typescriptreact]': jsConfig,
  "[jsonc]": jsConfig
};