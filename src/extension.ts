// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { Parser } from './parser';
import { RegionService } from './engine/RegionServices';
import { ConfigurationService } from './config/Configuration';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let activeEditor: vscode.TextEditor;
  let parser: Parser = new Parser();
  let configService = new ConfigurationService(context);

  // Called to handle events below
  let updateDecorations = function (useHash = false) {
    // * if no active window is open, return
    if (!activeEditor) return;

    // * if lanugage isn't supported, return
    if (!parser.supportedLanguage) return;

    // Finds the single line comments using the language comment delimiter
    parser.FindSingleLineComments(activeEditor);

    // // Finds the multi line comments using the language comment delimiter
    parser.FindBlockComments(activeEditor);

    // // Apply the styles set in the package.json
    parser.ApplyDecorations(activeEditor);
  };

  // Get the active editor for the first time and initialise the regex
  if (vscode.window.activeTextEditor) {
    activeEditor = vscode.window.activeTextEditor;

    // Set the regex patterns for the specified language's comments
    parser.SetRegex(activeEditor.document.languageId);

    // Trigger first update of decorators
    triggerUpdateDecorations();
  }
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    
    console.log(vscode.window);
    if (editor) {
      activeEditor = editor;
      // Set regex for updated language
      parser.SetRegex(editor.document.languageId);

      // Trigger update to set decorations for newly active file
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeTextDocument((event) => {
    // Trigger updates if the text was changed in the same document
    if (activeEditor && event.document === activeEditor.document) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);


  // register support language files folding ranage
  configService.getSupportedLanguages().forEach(language => {
    vscode.languages.registerFoldingRangeProvider({
      language
    }, {
      provideFoldingRanges(document, context, token) {
        const rs = new RegionService(configService, document);
        const regions = rs.getRegions().map(r => {
          return {
            start: r.lineStart,
            end: r.lineEnd
          }
        });
        return regions
      }
    });
  });

  // * IMPORTANT:
  // To avoid calling update too often,
  // set a timer for 200ms to wait before updating decorations
  var timeout: NodeJS.Timer;
  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(updateDecorations, 200);
  }
}

// this method is called when your extension is deactivated
export function deactivate() { }
