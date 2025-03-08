// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-code-pybricks-fll-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vs-code-pybricks-fll-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VS_Code_pybricks-fll-extension!');
	});

	context.subscriptions.push(disposable);
}


// from https://stackoverflow.com/questions/65283770/how-do-i-copy-files-from-within-a-vscode-extension-to-the-workspace
async function copyFile(
	vscode: typeof import('vscode'),
	context: vscode.ExtensionContext,
	outputChannel: vscode.OutputChannel,
	sourcePath: string,
	destPath: string,
	callBack
) {
	try {
		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const data = await vscode.workspace.fs.readFile(
			vscode.Uri.file(context.asAbsolutePath(sourcePath))
		);
		const filePath = vscode.Uri.file(wsPath + destPath);
		wsedit.createFile(filePath, { ignoreIfExists: true });
		await vscode.workspace.fs.writeFile(filePath, data);
		let isDone = await vscode.workspace.applyEdit(wsedit);
		if (isDone) {
			outputChannel.appendLine(`File created successfully: ${destPath}`);
			callBack(null, true);
		}
	} catch (err) {
		outputChannel.appendLine(`ERROR: ${err}`);
		callBack(err, false);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
