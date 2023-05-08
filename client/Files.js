import m from 'mithril';
import { createFile, getFiles } from './storage';

export function Files() {
	function view() {
		const files = getFiles();
		return (
			<main class='pa3'>
				<h1 class='f1'>Your files</h1>
				<button class="f6 ba b--black-025 link dim ph3 pv2 mb2 dib white bg-black" onclick={newFile}>New file</button>
				{files.length > 0 && 
					<section class="pt3">
						<ul class="list pl0">
							{files.map(file => 
								<li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
									<a class='link' href={'#!/file/' + file.id}>{file.name}</a>
									<span class='fr'>{(file.creationDate === file.modificationDate ? 'Created' : 'Last modified')} on {new Date(file.modificationDate).toLocaleString(
										navigator.languages?.[0] ?? navigator.language ?? 'en-US',
										{dateStyle: 'long', timeStyle: 'medium'}
									)}</span>
								</li>
							)}
						</ul>
					</section>
				}
				{files.length === 0 && 
					<p class="i black-50">You have no files</p>
				}
			</main>
		)
	}

	function newFile() {
		createFile();
	}

	return { view };
}
