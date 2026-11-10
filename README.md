# FOSS Commons

A responsive, illustrated landing page built with plain HTML, CSS, and JavaScript. No framework, package installation, build process, API key, or backend is required.

## Quick start

Unzip this folder and open `index.html` in a browser. For a local web server, run the following from this folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. VS Code's Live Server extension also works.

## Put it on GitHub

Create a repository, then upload **the contents of this folder**. `index.html` should be at the root of the repository, alongside `styles.css`, `script.js`, and `assets/`.

If you prefer Git, run these commands from this folder after creating your empty repository. Replace `YOUR_USERNAME` and the repository name with your own:

```sh
git init
git add .
git commit -m "Create FOSS Commons landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fosscommons.git
git push -u origin main
```

## Connect GitHub to Vercel

1. In Vercel, add a new project and import your GitHub repository.
2. Select **Other** as the framework preset.
3. Keep the root directory at the folder containing `index.html`.
4. Leave the build command empty. The included `vercel.json` disables the build step and serves the project root (`.`).
5. Deploy. Future pushes to your connected production branch will update the site.

If you upload the enclosing `fosscommons/` folder instead of its contents, set Vercel's root directory to `fosscommons`.

Official references: [Vercel GitHub integration](https://vercel.com/docs/git/vercel-for-github) · [Vercel static build settings](https://vercel.com/docs/builds/configure-a-build).

### Optional: GitHub Pages

This site also works on GitHub Pages. In your repository's **Settings → Pages**, choose **Deploy from a branch**, then `main` and `/ (root)`. The `.nojekyll` file is included. Relative asset paths work on both root domains and repository subpaths.

[GitHub Pages setup documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Add your community links

Edit `site-config.js`:

```js
window.FOSS_COMMONS = {
  communityUrl: "", // Add your full HTTPS Discord, Matrix, or forum invitation.
  communityLabel: "Join the commons",
  communityNote: "Come say hello. All levels of experience are welcome.",
  githubUrl: "", // Add your GitHub organisation or repository URL.
  githubLabel: "Find us on GitHub"
};
```

When `communityUrl` is set, the header and final call-to-action link to your community. When `githubUrl` is set, the footer links to your GitHub page. Invalid or blank URLs keep the working defaults.

The initial version uses real external learning resources and GitHub issue discovery, because no FOSS Commons invitation or repository URL was supplied. The page does not pretend to register visitors or collect emails.

## Edit the design and content

| File | What to change |
| --- | --- |
| `index.html` | Copy, sections, navigation, tab content, metadata, community values |
| `styles.css` | Colours in `:root`, spacing, typography, layouts and responsive breakpoints |
| `script.js` | Menu, accessible tabs, community-values dialog and config handling |
| `site-config.js` | Your public community and GitHub destinations |
| `assets/hero-space.webp` | Main astronaut-and-Earth illustration |
| `assets/commons-lab.webp` | Secondary illustration of astronauts growing a sprout |
| `assets/mascot.svg` | Editable standalone pixel mascot with a transparent background |
| `assets/favicon.svg` | Browser icon |
| `vercel.json` | Vercel's static deployment settings |

The mascot is also defined in the SVG symbol at the top of `index.html`. If changing its geometry, update that symbol and the standalone SVG files together.

Once you know the production domain, change `og:image` in `index.html` to the full public URL of the hero artwork (for example, your domain followed by `/assets/hero-space.webp`). Add a canonical URL and `og:url` for your domain if desired.

## Included behaviour

- Responsive layout from narrow phones to wide desktop screens.
- Mobile menu with Escape dismissal, outside-click dismissal and correct expanded state.
- Learn / Build / Share tabs supporting arrow keys, Home and End.
- Native community-values dialog with keyboard focus containment and Escape dismissal.
- Skip link, visible focus indicators, image descriptions and reduced-motion support.
- Useful content and resource links remain available with JavaScript disabled.
- Original illustrations inspired by the supplied references, optimized as WebP.
- System font stack, local assets and no third-party JavaScript or tracking.

This is a static site. The only outbound navigation is through the visible resource links or the public community links you configure. There is no newsletter backend, account system, or database to set up.
