/// <reference path="typings/node/node.d.ts" />

import {readFileSync} from "fs";
import * as ts from "typescript";

export function print_ast(sourceFile) {
    emit(sourceFile);

    function emitIdentifier(node: ts.Identifier) {
        write("Identifier*(text=");
        write(node.text);
        write(")");
    }

    function emitQualifiedName(node: ts.QualifiedName) {
        write("QualifiedName(left=");
        emit(node.left);
        write(", right=");
        emit(node.right);
        write(")");
    }

    function emitComputedPropertyName(node: ts.ComputedPropertyName) {
        write("ComputedPropertyName(expression=");
        emit(node.expression);
        write(")");
    }    
    
    function emitDecorator(node: ts.Decorator) {
        write("Decorator(expression=");
        emit(node.expression);
        write(")");
    }
    
    function emitTypeParameterDeclaration(node: ts.TypeParameterDeclaration) {
        write("TypeParameterDeclaration*(name=");
        emit(node.name);
        write(", constraint=");
        emit(node.constraint);
        write(")");
    }

    function emitCallConstructSignatureDeclaration(node: ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration) {
        if (node.kind === ts.SyntaxKind.CallSignature)
            write("CallSignatureDeclaration");
        else
            write("ConstructSignatureDeclaration");
        write("*(name=");
        emit(node.name);
        write(", typeParameters=");
        emit(node.typeParameters);
        write(", parameters=");
        emit(node.parameters);
        write(", type=");
        emit(node.type);
        write(", questionToken=");
        emit(node.questionToken);
        write(")");
    }

    function emitVariableDeclaration(node: ts.VariableDeclaration) {
        write("VariableDeclaration*(name=");
        emit(node.name);
        write(", type=");
        emit(node.type);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }

    function emitVariableDeclarationList(node: ts.VariableDeclarationList) {
        write("VariableDeclarationList(declarations=");
        emit(node.declarations);
        write(")");
    }

    function emitParameterDeclaration(node: ts.ParameterDeclaration) {
        write("VariableDeclaration(dotDotDotToken=");
        emit(node.dotDotDotToken);
        write(", name=");
        emit(node.name);
        write(", questionToken=");
        emit(node.questionToken);
        write(", type=");
        emit(node.type);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }
    
    function emitBindingElement(node: ts.BindingElement) {
        write("BindingElement(dotDotDotToken=");
        emit(node.dotDotDotToken);
        write(", name=");
        emit(node.name);
        write(", propertyName=");
        emit(node.propertyName);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }

    function emitPropertySignature(node: ts.PropertySignature) {
        write("PropertySignature(name=");
        emit(node.name);
        write(", questionToken=");
        emit(node.questionToken);
        write(", type=");
        emit(node.type);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }

    function emitPropertyDeclaration(node: ts.PropertyDeclaration) {
        write("PropertyDeclaration*(name=");
        emit(node.name);
        write(", type=");
        emit(node.type);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }

    function emitPropertyAssignment(node: ts.PropertyAssignment) {
        write("PropertyAssignment(name=");
        emit(node.name);
        write(", questionToken=");
        emit(node.questionToken);
        write(", initializer=");
        emit(node.initializer);
        write(")");
    }

    function emitShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment) {
        write("ShorthandPropertyAssignment(name=");
        emit(node.name);
        write(", questionToken=");
        emit(node.questionToken);
        write(", equalsToken");
        emit(node.questionToken);
        write(", objectAssignmentInitializer=");
        emit(node.objectAssignmentInitializer);
        write(")");
    }

    function emitBindingPattern(node: ts.BindingPattern) {
        if (node.kind === ts.SyntaxKind.ObjectBindingPattern)
            write("ObjectBindingPattern");
        else
            write("ArrayBindingPattern");
        write("(elements=");
        emit(node.elements);
        write(")");
    }

    function emitFunctionDeclaration(node: ts.FunctionDeclaration) {
        write("FunctionDeclaration(name=");
        emit(node.name);
        write(", typeParameters=");
        emit(node.typeParameters);
        write(", parameters=");
        emit(node.parameters);
        write(", type=");
        emit(node.type);
        write(", asteriskToken=");
        emit(node.asteriskToken);
        write(", questionToken=");
        emit(node.questionToken);
        write(", body=");
        emit(node.body);
        write(")");
    }

    function emitMethodSignature(node: ts.MethodSignature) {
        write("MethodSignature(name=");
        emit(node.name);
        write(", typeParameters=");
        emit(node.typeParameters);
        write(", parameters=");
        emit(node.parameters);
        write(", type=");
        emit(node.type);
        write(", questionToken=");
        emit(node.questionToken);
        write(")");
    }

    function emitMethodDeclaration(node: ts.MethodDeclaration) {
        write("MethodDeclaration(name=");
        emit(node.name);
        write(", typeParameters=");
        emit(node.typeParameters);
        write(", parameters=");
        emit(node.parameters);
        write(", type=");
        emit(node.type);
        write(", asteriskToken=");
        emit(node.asteriskToken);
        write(", questionToken=");
        emit(node.questionToken);
        write(", body=");
        emit(node.body);
        write(")");
    }

    // kind constructor
    function emitConstructorDeclaration(node: ts.ConstructorDeclaration) {
        write("ConstructorDeclaration(name=");
        emit(node.name);
        write(", typeParameters=");
        emit(node.typeParameters);
        write(", parameters=");
        emit(node.parameters);
        write(", type=");
        emit(node.type);
        write(", asteriskToken=");
        emit(node.asteriskToken);
        write(", questionToken=");
        emit(node.questionToken);
        write(", body=");
        emit(node.body);
        write(")");
    }    

    function emitSemicolonClassElement(node: ts.SemicolonClassElement) {
        write("SemicolonClassElement(name=");
        emit(node.name);
        write(")");
    }

    function emitNodeArray(narr: ts.NodeArray<ts.Node>) {
        write("[");
        var first = true
        for (var elt of narr) {
            if (!first)
                write(",");
            first = false;
            emit(elt);
        }
        write("]");
    }

    function emit(val) {
        if (!val) 
            return write("None");

        if (val instanceof Array)
            return emitNodeArray(<ts.NodeArray<ts.Node>> val)
        
        var node = <ts.Node> val;

        switch (node.kind) {
        case ts.SyntaxKind.Identifier:
            return emitIdentifier(<ts.Identifier> node);
        case ts.SyntaxKind.QualifiedName:
            return emitQualifiedName(<ts.QualifiedName> node);
        case ts.SyntaxKind.ComputedPropertyName:
            return emitComputedPropertyName(<ts.ComputedPropertyName> node);
        case ts.SyntaxKind.Decorator:
            return emitDecorator(<ts.Decorator> node);
        case ts.SyntaxKind.TypeParameter:
            return emitTypeParameterDeclaration(<ts.TypeParameterDeclaration> node);
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
            return emitCallConstructSignatureDeclaration(<ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration> node);
        case ts.SyntaxKind.VariableDeclaration:
            return emitVariableDeclaration(<ts.VariableDeclaration> node);
        case ts.SyntaxKind.VariableDeclarationList:
            return emitVariableDeclarationList(<ts.VariableDeclarationList> node);
        case ts.SyntaxKind.Parameter:
            return emitParameterDeclaration(<ts.ParameterDeclaration> node);
        case ts.SyntaxKind.BindingElement:
            return emitBindingElement(<ts.BindingElement> node);
        case ts.SyntaxKind.PropertySignature:
            return emitPropertySignature(<ts.PropertySignature> node);
        case ts.SyntaxKind.PropertyDeclaration:
            return emitPropertyDeclaration(<ts.PropertyDeclaration> node);
        case ts.SyntaxKind.PropertyAssignment:
            return emitPropertyAssignment(<ts.PropertyAssignment> node);
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return emitShorthandPropertyAssignment(<ts.ShorthandPropertyAssignment> node);
        default: 
            emitArbitraryNode(node);
        }

    }

    function emitArbitraryNode(node: ts.Node) {
        write(getArbitraryNodeName(node));
        write("(")
        var first = true;
        for(var key in node) {
            if (key === "parent" ||
                key === "text" ||
                key === "pos" ||
                key === "end" ||
                key === "kind" ||
                (!node[key] && key === "flags") || 
                (node[key] && node[key] instanceof Function))
                continue;
            if (!first) {
                write(", ");
            }
            first = false;
            write(key);
            write("=");
            if (node[key]) {
                if (node[key].kind || node[key] instanceof Array)
                    emit(node[key]);
                else if (node[key] instanceof Function)
                    write("[[Function]]");
                else write(node[key] + "");
            } else write("None");
        }
        write(")");
    }
    
    function getArbitraryNodeName(node: ts.Node): string {
        switch (node.kind) {
        case ts.SyntaxKind.Unknown: return "Unknown" 
        case ts.SyntaxKind.EndOfFileToken: return "EndOfFileToken" 
        case ts.SyntaxKind.SingleLineCommentTrivia: return "SingleLineCommentTrivia"
        case ts.SyntaxKind.MultiLineCommentTrivia: return "MultiLineCommentTrivia" 
        case ts.SyntaxKind.NewLineTrivia: return "NewLineTrivia" 
        case ts.SyntaxKind.WhitespaceTrivia: return "WhitespaceTrivia" 
        case ts.SyntaxKind.ShebangTrivia: return "ShebangTrivia"
        case ts.SyntaxKind.ConflictMarkerTrivia: return "ConflictMarkerTrivia"
        case ts.SyntaxKind.NumericLiteral: return "NumericLiteral"
        case ts.SyntaxKind.StringLiteral: return "StringLiteral"
        case ts.SyntaxKind.RegularExpressionLiteral: return "RegularExpressionLiteral"
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral: return "NoSubstitutionTemplateLiteral"
        case ts.SyntaxKind.TemplateHead: return "TemplateHead"
        case ts.SyntaxKind.TemplateMiddle: return "TemplateMiddle"
        case ts.SyntaxKind.TemplateTail: return "TemplateTail"
        case ts.SyntaxKind.OpenBraceToken: return "OpenBraceToken"
        case ts.SyntaxKind.CloseBraceToken: return "CloseBraceToken"
        case ts.SyntaxKind.OpenParenToken: return "OpenParenToken"
        case ts.SyntaxKind.CloseParenToken: return "CloseParenToken"
        case ts.SyntaxKind.OpenBracketToken: return "OpenBracketToken"
        case ts.SyntaxKind.CloseBracketToken: return "CloseBracketToken"
        case ts.SyntaxKind.DotToken: return "DotToken"
        case ts.SyntaxKind.DotDotDotToken: return "DotDotDotToken"
        case ts.SyntaxKind.SemicolonToken: return "SemicolonToken"
        case ts.SyntaxKind.CommaToken: return "CommaToken"
        case ts.SyntaxKind.LessThanToken: return "LessThanToken"
        case ts.SyntaxKind.LessThanSlashToken: return "LessThanSlashToken"
        case ts.SyntaxKind.GreaterThanToken: return "GreaterThanToken"
        case ts.SyntaxKind.LessThanEqualsToken: return "LessThanEqualsToken"
        case ts.SyntaxKind.GreaterThanEqualsToken: return "GreaterThanEqualsToken"
        case ts.SyntaxKind.EqualsEqualsToken: return "EqualsEqualsToken"
        case ts.SyntaxKind.ExclamationEqualsToken: return "ExclamationEqualsToken"
        case ts.SyntaxKind.EqualsEqualsEqualsToken: return "EqualsEqualsEqualsToken"
        case ts.SyntaxKind.ExclamationEqualsEqualsToken: return "ExclamationEqualsEqualsToken"
        case ts.SyntaxKind.EqualsGreaterThanToken: return "EqualsGreaterThanToken"
        case ts.SyntaxKind.PlusToken: return "PlusToken"
        case ts.SyntaxKind.MinusToken: return "MinusToken"
        case ts.SyntaxKind.AsteriskToken: return "AsteriskToken"
        case ts.SyntaxKind.AsteriskAsteriskToken: return "AsteriskAsteriskToken"
        case ts.SyntaxKind.SlashToken: return "SlashToken"
        case ts.SyntaxKind.PercentToken: return "PercentToken"
        case ts.SyntaxKind.PlusPlusToken: return "PlusPlusToken"
        case ts.SyntaxKind.MinusMinusToken: return "MinusMinusToken"
        case ts.SyntaxKind.LessThanLessThanToken: return "LessThanLessThanToken"
        case ts.SyntaxKind.GreaterThanGreaterThanToken: return "GreaterThanGreaterThanToken"
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return "GreaterThanGreaterThanGreaterThanToken"
        case ts.SyntaxKind.AmpersandToken: return "AmpersandToken"
        case ts.SyntaxKind.BarToken: return "BarToken"
        case ts.SyntaxKind.CaretToken: return "CaretToken"
        case ts.SyntaxKind.ExclamationToken: return "ExclamationToken"
        case ts.SyntaxKind.TildeToken: return "TildeToken"
        case ts.SyntaxKind.AmpersandAmpersandToken: return "AmpersandAmpersandToken"
        case ts.SyntaxKind.BarBarToken: return "BarBarToken"
        case ts.SyntaxKind.QuestionToken: return "QuestionToken"
        case ts.SyntaxKind.ColonToken: return "ColonToken"
        case ts.SyntaxKind.AtToken: return "AtToken"
        case ts.SyntaxKind.EqualsToken: return "EqualsToken"
        case ts.SyntaxKind.PlusEqualsToken: return "PlusEqualsToken"
        case ts.SyntaxKind.MinusEqualsToken: return "MinusEqualsToken"
        case ts.SyntaxKind.AsteriskEqualsToken: return "AsteriskEqualsToken"
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken: return "AsteriskAsteriskEqualsToken"
        case ts.SyntaxKind.SlashEqualsToken: return "SlashEqualsToken"
        case ts.SyntaxKind.PercentEqualsToken: return "PercentEqualsToken"
        case ts.SyntaxKind.LessThanLessThanEqualsToken: return "LessThanLessThanEqualsToken"
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken: return "GreaterThanGreaterThanEqualsToken"
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken: return "GreaterThanGreaterThanGreaterThanEqualsToken"
        case ts.SyntaxKind.AmpersandEqualsToken: return "AmpersandEqualsToken"
        case ts.SyntaxKind.BarEqualsToken: return "BarEqualsToken"
        case ts.SyntaxKind.CaretEqualsToken: return "CaretEqualsToken"
        case ts.SyntaxKind.Identifier: return "Identifier"
        case ts.SyntaxKind.BreakKeyword: return "BreakKeyword"
        case ts.SyntaxKind.CaseKeyword: return "CaseKeyword"
        case ts.SyntaxKind.CatchKeyword: return "CatchKeyword"
        case ts.SyntaxKind.ClassKeyword: return "ClassKeyword"
        case ts.SyntaxKind.ConstKeyword: return "ConstKeyword"
        case ts.SyntaxKind.ContinueKeyword: return "ContinueKeyword"
        case ts.SyntaxKind.DebuggerKeyword: return "DebuggerKeyword"
        case ts.SyntaxKind.DefaultKeyword: return "DefaultKeyword"
        case ts.SyntaxKind.DeleteKeyword: return "DeleteKeyword"
        case ts.SyntaxKind.DoKeyword: return "DoKeyword"
        case ts.SyntaxKind.ElseKeyword: return "ElseKeyword"
        case ts.SyntaxKind.EnumKeyword: return "EnumKeyword"
        case ts.SyntaxKind.ExportKeyword: return "ExportKeyword"
        case ts.SyntaxKind.ExtendsKeyword: return "ExtendsKeyword"
        case ts.SyntaxKind.FalseKeyword: return "FalseKeyword"
        case ts.SyntaxKind.FinallyKeyword: return "FinallyKeyword"
        case ts.SyntaxKind.ForKeyword: return "ForKeyword"
        case ts.SyntaxKind.FunctionKeyword: return "FunctionKeyword"
        case ts.SyntaxKind.IfKeyword: return "IfKeyword"
        case ts.SyntaxKind.ImportKeyword: return "ImportKeyword"
        case ts.SyntaxKind.InKeyword: return "InKeyword"
        case ts.SyntaxKind.InstanceOfKeyword: return "InstanceOfKeyword"
        case ts.SyntaxKind.NewKeyword: return "NewKeyword"
        case ts.SyntaxKind.NullKeyword: return "NullKeyword"
        case ts.SyntaxKind.ReturnKeyword: return "ReturnKeyword"
        case ts.SyntaxKind.SuperKeyword: return "SuperKeyword"
        case ts.SyntaxKind.SwitchKeyword: return "SwitchKeyword"
        case ts.SyntaxKind.ThisKeyword: return "ThisKeyword"
        case ts.SyntaxKind.ThrowKeyword: return "ThrowKeyword"
        case ts.SyntaxKind.TrueKeyword: return "TrueKeyword"
        case ts.SyntaxKind.TryKeyword: return "TryKeyword"
        case ts.SyntaxKind.TypeOfKeyword: return "TypeOfKeyword"
        case ts.SyntaxKind.VarKeyword: return "VarKeyword"
        case ts.SyntaxKind.VoidKeyword: return "VoidKeyword"
        case ts.SyntaxKind.WhileKeyword: return "WhileKeyword"
        case ts.SyntaxKind.WithKeyword: return "WithKeyword"
        case ts.SyntaxKind.ImplementsKeyword: return "ImplementsKeyword"
        case ts.SyntaxKind.InterfaceKeyword: return "InterfaceKeyword"
        case ts.SyntaxKind.LetKeyword: return "LetKeyword"
        case ts.SyntaxKind.PackageKeyword: return "PackageKeyword"
        case ts.SyntaxKind.PrivateKeyword: return "PrivateKeyword"
        case ts.SyntaxKind.ProtectedKeyword: return "ProtectedKeyword"
        case ts.SyntaxKind.PublicKeyword: return "PublicKeyword"
        case ts.SyntaxKind.StaticKeyword: return "StaticKeyword"
        case ts.SyntaxKind.YieldKeyword: return "YieldKeyword"
        case ts.SyntaxKind.AbstractKeyword: return "AbstractKeyword"
        case ts.SyntaxKind.AsKeyword: return "AsKeyword"
        case ts.SyntaxKind.AnyKeyword: return "AnyKeyword"
        case ts.SyntaxKind.AsyncKeyword: return "AsyncKeyword"
        case ts.SyntaxKind.AwaitKeyword: return "AwaitKeyword"
        case ts.SyntaxKind.BooleanKeyword: return "BooleanKeyword"
        case ts.SyntaxKind.ConstructorKeyword: return "ConstructorKeyword"
        case ts.SyntaxKind.DeclareKeyword: return "DeclareKeyword"
        case ts.SyntaxKind.GetKeyword: return "GetKeyword"
        case ts.SyntaxKind.IsKeyword: return "IsKeyword"
        case ts.SyntaxKind.ModuleKeyword: return "ModuleKeyword"
        case ts.SyntaxKind.NamespaceKeyword: return "NamespaceKeyword"
  //      case ts.SyntaxKind.ReadonlyKeyword: return "ReadonlyKeyword"
        case ts.SyntaxKind.RequireKeyword: return "RequireKeyword"
        case ts.SyntaxKind.NumberKeyword: return "NumberKeyword"
        case ts.SyntaxKind.SetKeyword: return "SetKeyword"
        case ts.SyntaxKind.StringKeyword: return "StringKeyword"
        case ts.SyntaxKind.SymbolKeyword: return "SymbolKeyword"
        case ts.SyntaxKind.TypeKeyword: return "TypeKeyword"
   //     case ts.SyntaxKind.UndefinedKeyword: return "UndefinedKeyword"
        case ts.SyntaxKind.FromKeyword: return "FromKeyword"
        case ts.SyntaxKind.GlobalKeyword: return "GlobalKeyword"
        case ts.SyntaxKind.OfKeyword: return "OfKeyword" // LastKeyword and LastToken
        case ts.SyntaxKind.QualifiedName: return "QualifiedName"
        case ts.SyntaxKind.ComputedPropertyName: return "ComputedPropertyName"
        case ts.SyntaxKind.TypeParameter: return "TypeParameter"
        case ts.SyntaxKind.Parameter: return "Parameter"
        case ts.SyntaxKind.Decorator: return "Decorator"
        case ts.SyntaxKind.PropertySignature: return "PropertySignature"
        case ts.SyntaxKind.PropertyDeclaration: return "PropertyDeclaration"
        case ts.SyntaxKind.MethodSignature: return "MethodSignature"
        case ts.SyntaxKind.MethodDeclaration: return "MethodDeclaration"
        case ts.SyntaxKind.Constructor: return "Constructor"
        case ts.SyntaxKind.GetAccessor: return "GetAccessor"
        case ts.SyntaxKind.SetAccessor: return "SetAccessor"
        case ts.SyntaxKind.CallSignature: return "CallSignature"
        case ts.SyntaxKind.ConstructSignature: return "ConstructSignature"
        case ts.SyntaxKind.IndexSignature: return "IndexSignature"
        case ts.SyntaxKind.TypePredicate: return "TypePredicate"
        case ts.SyntaxKind.TypeReference: return "TypeReference"
        case ts.SyntaxKind.FunctionType: return "FunctionType"
        case ts.SyntaxKind.ConstructorType: return "ConstructorType"
        case ts.SyntaxKind.TypeQuery: return "TypeQuery"
        case ts.SyntaxKind.TypeLiteral: return "TypeLiteral"
        case ts.SyntaxKind.ArrayType: return "ArrayType"
        case ts.SyntaxKind.TupleType: return "TupleType"
        case ts.SyntaxKind.UnionType: return "UnionType"
        case ts.SyntaxKind.IntersectionType: return "IntersectionType"
        case ts.SyntaxKind.ParenthesizedType: return "ParenthesizedType"
        case ts.SyntaxKind.ThisType: return "ThisType"
        case ts.SyntaxKind.StringLiteralType: return "StringLiteralType"
        case ts.SyntaxKind.ObjectBindingPattern: return "ObjectBindingPattern"
        case ts.SyntaxKind.ArrayBindingPattern: return "ArrayBindingPattern"
        case ts.SyntaxKind.BindingElement: return "BindingElement"
        case ts.SyntaxKind.ArrayLiteralExpression: return "ArrayLiteralExpression"
        case ts.SyntaxKind.ObjectLiteralExpression: return "ObjectLiteralExpression"
        case ts.SyntaxKind.PropertyAccessExpression: return "PropertyAccessExpression"
        case ts.SyntaxKind.ElementAccessExpression: return "ElementAccessExpression"
        case ts.SyntaxKind.CallExpression: return "CallExpression"
        case ts.SyntaxKind.NewExpression: return "NewExpression"
        case ts.SyntaxKind.TaggedTemplateExpression: return "TaggedTemplateExpression"
        case ts.SyntaxKind.TypeAssertionExpression: return "TypeAssertionExpression"
        case ts.SyntaxKind.ParenthesizedExpression: return "ParenthesizedExpression"
        case ts.SyntaxKind.FunctionExpression: return "FunctionExpression"
        case ts.SyntaxKind.ArrowFunction: return "ArrowFunction"
        case ts.SyntaxKind.DeleteExpression: return "DeleteExpression"
        case ts.SyntaxKind.TypeOfExpression: return "TypeOfExpression"
        case ts.SyntaxKind.VoidExpression: return "VoidExpression"
        case ts.SyntaxKind.AwaitExpression: return "AwaitExpression"
        case ts.SyntaxKind.PrefixUnaryExpression: return "PrefixUnaryExpression"
        case ts.SyntaxKind.PostfixUnaryExpression: return "PostfixUnaryExpression"
        case ts.SyntaxKind.BinaryExpression: return "BinaryExpression"
        case ts.SyntaxKind.ConditionalExpression: return "ConditionalExpression"
        case ts.SyntaxKind.TemplateExpression: return "TemplateExpression"
        case ts.SyntaxKind.YieldExpression: return "YieldExpression"
        case ts.SyntaxKind.SpreadElementExpression: return "SpreadElementExpression"
        case ts.SyntaxKind.ClassExpression: return "ClassExpression"
        case ts.SyntaxKind.OmittedExpression: return "OmittedExpression"
        case ts.SyntaxKind.ExpressionWithTypeArguments: return "ExpressionWithTypeArguments"
        case ts.SyntaxKind.AsExpression: return "AsExpression"
   //     case ts.SyntaxKind.NonNullExpression: return "NonNullExpression"
        case ts.SyntaxKind.TemplateSpan: return "TemplateSpan"
        case ts.SyntaxKind.SemicolonClassElement: return "SemicolonClassElement"
        case ts.SyntaxKind.Block: return "Block"
        case ts.SyntaxKind.VariableStatement: return "VariableStatement"
        case ts.SyntaxKind.EmptyStatement: return "EmptyStatement"
        case ts.SyntaxKind.ExpressionStatement: return "ExpressionStatement"
        case ts.SyntaxKind.IfStatement: return "IfStatement"
        case ts.SyntaxKind.DoStatement: return "DoStatement"
        case ts.SyntaxKind.WhileStatement: return "WhileStatement"
        case ts.SyntaxKind.ForStatement: return "ForStatement"
        case ts.SyntaxKind.ForInStatement: return "ForInStatement"
        case ts.SyntaxKind.ForOfStatement: return "ForOfStatement"
        case ts.SyntaxKind.ContinueStatement: return "ContinueStatement"
        case ts.SyntaxKind.BreakStatement: return "BreakStatement"
        case ts.SyntaxKind.ReturnStatement: return "ReturnStatement"
        case ts.SyntaxKind.WithStatement: return "WithStatement"
        case ts.SyntaxKind.SwitchStatement: return "SwitchStatement"
        case ts.SyntaxKind.LabeledStatement: return "LabeledStatement"
        case ts.SyntaxKind.ThrowStatement: return "ThrowStatement"
        case ts.SyntaxKind.TryStatement: return "TryStatement"
        case ts.SyntaxKind.DebuggerStatement: return "DebuggerStatement"
        case ts.SyntaxKind.VariableDeclaration: return "VariableDeclaration"
        case ts.SyntaxKind.VariableDeclarationList: return "VariableDeclarationList"
        case ts.SyntaxKind.FunctionDeclaration: return "FunctionDeclaration"
        case ts.SyntaxKind.ClassDeclaration: return "ClassDeclaration"
        case ts.SyntaxKind.InterfaceDeclaration: return "InterfaceDeclaration"
        case ts.SyntaxKind.TypeAliasDeclaration: return "TypeAliasDeclaration"
        case ts.SyntaxKind.EnumDeclaration: return "EnumDeclaration"
        case ts.SyntaxKind.ModuleDeclaration: return "ModuleDeclaration"
        case ts.SyntaxKind.ModuleBlock: return "ModuleBlock"
        case ts.SyntaxKind.CaseBlock: return "CaseBlock"
    //    case ts.SyntaxKind.GlobalModuleExportDeclaration: return "GlobalModuleExportDeclaration"
        case ts.SyntaxKind.ImportEqualsDeclaration: return "ImportEqualsDeclaration"
        case ts.SyntaxKind.ImportDeclaration: return "ImportDeclaration"
        case ts.SyntaxKind.ImportClause: return "ImportClause"
        case ts.SyntaxKind.NamespaceImport: return "NamespaceImport"
        case ts.SyntaxKind.NamedImports: return "NamedImports"
        case ts.SyntaxKind.ImportSpecifier: return "ImportSpecifier"
        case ts.SyntaxKind.ExportAssignment: return "ExportAssignment"
        case ts.SyntaxKind.ExportDeclaration: return "ExportDeclaration"
        case ts.SyntaxKind.NamedExports: return "NamedExports"
        case ts.SyntaxKind.ExportSpecifier: return "ExportSpecifier"
        case ts.SyntaxKind.MissingDeclaration: return "MissingDeclaration"

        case ts.SyntaxKind.ExternalModuleReference: return "ExternalModuleReference"

        case ts.SyntaxKind.JsxElement: return "JsxElement"
        case ts.SyntaxKind.JsxSelfClosingElement: return "JsxSelfClosingElement"
        case ts.SyntaxKind.JsxOpeningElement: return "JsxOpeningElement"
        case ts.SyntaxKind.JsxText: return "JsxText"
        case ts.SyntaxKind.JsxClosingElement: return "JsxClosingElement"
        case ts.SyntaxKind.JsxAttribute: return "JsxAttribute"
        case ts.SyntaxKind.JsxSpreadAttribute: return "JsxSpreadAttribute"
        case ts.SyntaxKind.JsxExpression: return "JsxExpression"

        case ts.SyntaxKind.CaseClause: return "CaseClause"
        case ts.SyntaxKind.DefaultClause: return "DefaultClause"
        case ts.SyntaxKind.HeritageClause: return "HeritageClause"
        case ts.SyntaxKind.CatchClause: return "CatchClause"

        case ts.SyntaxKind.PropertyAssignment: return "PropertyAssignment"
        case ts.SyntaxKind.ShorthandPropertyAssignment: return "ShorthandPropertyAssignment"

        case ts.SyntaxKind.EnumMember: return "EnumMember"
        case ts.SyntaxKind.SourceFile: return "SourceFile"

        case ts.SyntaxKind.JSDocTypeExpression: return "JSDocTypeExpression"
        case ts.SyntaxKind.JSDocAllType: return "JSDocAllType"
        case ts.SyntaxKind.JSDocUnknownType: return "JSDocUnknownType"
        case ts.SyntaxKind.JSDocArrayType: return "JSDocArrayType"
        case ts.SyntaxKind.JSDocUnionType: return "JSDocUnionType"
        case ts.SyntaxKind.JSDocTupleType: return "JSDocTupleType"
        case ts.SyntaxKind.JSDocNullableType: return "JSDocNullableType"
        case ts.SyntaxKind.JSDocNonNullableType: return "JSDocNonNullableType"
        case ts.SyntaxKind.JSDocRecordType: return "JSDocRecordType"
        case ts.SyntaxKind.JSDocRecordMember: return "JSDocRecordMember"
        case ts.SyntaxKind.JSDocTypeReference: return "JSDocTypeReference"
        case ts.SyntaxKind.JSDocOptionalType: return "JSDocOptionalType"
        case ts.SyntaxKind.JSDocFunctionType: return "JSDocFunctionType"
        case ts.SyntaxKind.JSDocVariadicType: return "JSDocVariadicType"
        case ts.SyntaxKind.JSDocConstructorType: return "JSDocConstructorType"
        case ts.SyntaxKind.JSDocThisType: return "JSDocThisType"
        case ts.SyntaxKind.JSDocComment: return "JSDocComment"
        case ts.SyntaxKind.JSDocTag: return "JSDocTag"
        case ts.SyntaxKind.JSDocParameterTag: return "JSDocParameterTag"
        case ts.SyntaxKind.JSDocReturnTag: return "JSDocReturnTag"
        case ts.SyntaxKind.JSDocTypeTag: return "JSDocTypeTag"
        case ts.SyntaxKind.JSDocTemplateTag: return "JSDocTemplateTag"

        case ts.SyntaxKind.SyntaxList: return "SyntaxList"
        case ts.SyntaxKind.Count: return "Count"
        default: return node.constructor + "";
        }
    }


    function write(message: string) {
        process.stdout.write(message);
    }

    function printAST(node) {
        ts.forEachChild(node, emit);
    }
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    // Parse a file
    let sourceFile = ts.createSourceFile(fileName, readFileSync(fileName).toString(), ts.ScriptTarget.ES6, /*setParentNodes */ true);

    // delint it
    print_ast(sourceFile.statements);
});