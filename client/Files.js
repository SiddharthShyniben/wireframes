import m from 'mithril';
import { createFile, getFiles } from './storage';

export function Files() {
	function view() {
		const files = getFiles();
		return (
			<div>
				<h1>Your files</h1>
				<button onclick={newFile}>New file</button>
				{files.length > 0 && 
					<ul>
						{files.map(file => 
							<li><a href={'#!/file/' + file.id}>{file.name} ({(file.creationDate === file.modificationDate ? 'Created' : 'Last modified')} on {new Date(file.modificationDate).toLocaleString(
								navigator.languages?.[0] ?? navigator.language ?? 'en-US',
								{dateStyle: 'long', timeStyle: 'medium'}
							)})</a></li>
						)}
					</ul>
				}
				{files.length === 0 && 
					<p>You have no files</p>
				}
			</div>
		)
	}

	function newFile() {
		createFile();
	}

	return { view };
}
