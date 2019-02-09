let fs = require("fs");

class deleteInliner {
	constructor(file, data) {
		this.file = file;
		this.data;
	}
	
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	cleanStyles()  {
		fs.writeFileSync("../dist/styles_deleteinliner.css", '') 
	}
	
	writeHtml(i, newNumber) {
		let pattern = /style=["']([\w+-:;\s()_'"%#]+)["']?/gi;
		let newClass = `class="class${newNumber}"`;
		let newCode = i.replace(pattern, newClass);
		this.data = this.data.replace(i, newCode);
	}
	
	deleteStyles() {
		let pattern = /style=["']([\w+-:;\s()_'"%#]+)["']?/gi;
		let newCode = this.data.replace(pattern, "");
		fs.writeFileSync("../dist/code_deleteinliner.html", newCode);
	}

	readFile() {
		this.cleanStyles();
		let fileContent = fs.readFileSync(this.file, "utf8");
		this.data = fileContent;
		let pattern = /<[a-z][a-z0-9\s""'':;._/()=#-]*>/gi; // Берём каждый открывающий тег
		let collection = this.data.match(pattern);
		for (let i of collection) {
			if (i.indexOf('style=') !== -1) {
				let classPattern = /class=["'][\w+]*["']?/gi;
				let idPattern = /id=["'][\w+\s+\d+-]*["']?/gi;
				let stylePattern = /style=["'][\w+\s+\d+:;!,()/_.%"'#-]*["']?/gi;           
				let classCheck = i.match(classPattern); // Проверка на класс
				let idCheck = i.match(idPattern); // Проверка на идентификатор
				let styleCheck = i.match(stylePattern); // Вычленяем стили        
				let params = {classBlock: classCheck, idBlock: idCheck, styles: styleCheck};
				this.writeStyles(params, i);
			}
		}		
	}
	
	writeStyles(params, i) {
		let cropStyles = params.styles[0].replace(/["']*/gi, '');
		let styles = cropStyles.replace(/style=/gi, '');
		// Если есть класс
		if ((params.idBlock !== null && params.classBlock !== null) || (params.idBlock == null && params.classBlock !== null) ) {
			let cropString = params.classBlock[0].replace(/["']/gi, '');
			let cropStringNew = cropString.replace(/class=/gi, '' );
			let styleClass = `.${cropStringNew} {${styles}} `;
			fs.appendFileSync("../dist/styles_deleteinliner.css", styleClass);
		}
		// Если есть идентификатор, но нет класса
		if (params.classBlock == null && params.idBlock !== null) {
			let cropString = params.idBlock[0].replace(/["']/gi, '');
			let cropStringNew = cropString.replace(/id=/gi, '' );
			let idClass = `#${cropStringNew} {${styles}} `;
			fs.appendFileSync("../dist/styles_deleteinliner.css", idClass);
		}
		// Нет ни класса, ни идентификатора
		if (params.idBlock == null && params.classBlock == null) {
			let newNumber = this.getRandomInt(1, 10000000);
			let newClass = `.class${newNumber}{${styles}} `;
			fs.appendFileSync("../dist/styles_deleteinliner.css", newClass);
			this.writeHtml(i, newNumber);
		}
		this.deleteStyles();
	}
}

module.exports = deleteInliner;