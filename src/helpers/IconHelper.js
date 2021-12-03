import icons from "../assets/icons/index";

export const IconHelper = (filename) => {
	if (!filename) return icons.DefaultFile();

	const dismemberedFilename = filename.split(".");
	const dismemberedFilenameLength = dismemberedFilename.length;

	if (dismemberedFilenameLength > 0) {
		switch (dismemberedFilename[dismemberedFilenameLength - 1]) {
			case "js":
				return icons.JsFile();
			case "css":
				return icons.CssFile();
			case "gitignore":
				return icons.GitFile();
			case "png":
			case "svg":
			case "ico":
				return icons.ImageFile();
			case "json":
				return icons.JsonFile();
			case "md":
				return icons.ReadmeFile();
			case "lock":
				return icons.YarnFile();
			default:
				return icons.DefaultFile();
		}
	}
};
