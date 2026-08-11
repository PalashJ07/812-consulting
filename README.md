# 812 Consulting Website

Static website for 812 Consulting at Indiana University.

## Add The Real Photos

Save the two provided photos into the `assets` folder with these exact names:

- `assets/professional-team.jpg` for the professional group photo
- `assets/team-social.jpg` for the large social group photo

The site already references these names. If either file is missing, it falls back to the temporary generated image.

## Preview Locally

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Publish With GitHub Pages

1. Create a new public GitHub repository named `812-consulting`.
2. Upload these files and folders to the repository:
   - `index.html`
   - `styles.css`
   - `assets/`
3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.

After GitHub finishes publishing, the public URL will usually look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/812-consulting/
```

## Optional Custom Domain

If 812 Consulting later buys a domain, point it to GitHub Pages and add the domain in the repository's **Pages** settings.
