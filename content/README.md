# Editing Genuine Pretending

**This is the folder to use for everyday publishing.** The HTML templates, CSS, JavaScript, and Jekyll setup are outside it; you normally do not need to edit them.

## Where to edit

```text
content/
├── _publications/     Full essays and cultural pieces (.md)
├── _blog/             Personal blog notes and slice-of-life posts (.md)
├── _data/
│   ├── state.yml      Pinned State of Affairs announcement
│   ├── home.yml       Homepage text, photo and background image paths
│   ├── blog.yml       Blog introduction and status
│   ├── archive.yml    Archive introduction/filters descriptions
│   ├── about.yml      About-page copy
│   ├── events.yml     Events and screening listings
│   ├── navigation.yml Top navigation labels and destinations
│   └── site.yml       Journal name, description and footer credit
├── images/            Homepage background and photo of the week
└── legacy/            Archived early test page (not part of the journal)
```

## Publishing a publication

Create a Markdown file in `_publications/`. Copy a nearby file to retain the YAML front matter. The `type` field is `discourse` or `cultural`; `topics` become archive keyword filters. The `author_note` appears on the article, and an optional `blog_note` automatically produces a companion discussion in the Blog. **The publication URL uses the filename**, so avoid renaming published files unless you intend to change their URLs.

## Publishing a blog entry

Create a Markdown file in `_blog/`. Include `date`, `title`, `preview`, and `kind: blog` or `kind: slice-of-life` in the front matter. The Blog page automatically orders it with publication companion notes; you do not need to update an index.

## Updating the homepage

Change `_data/state.yml` for the pinned editorial. Change `_data/home.yml` for the homepage heading, description, section links, and photo appearance. Replace files in `images/` using the same filenames, or change the image paths in `home.yml`. Light/dark visual treatments and scrolling remain in the separate code files.

## Archive and Blog backgrounds

Both navigation pages support an optional static JPG background. Upload an image into `content/images/`, then set `background_image: /content/images/your-file.jpg` in `_data/archive.yml` or `_data/blog.yml`. Leave the field blank to use the usual solid background. The two pages can use separate images or the same file. This does not affect individual publication reading pages. The background is fixed in place without homepage parallax.

## About-page author photo

To add your author photo, upload a JPG, PNG, GIF or WebP into `content/images/` and edit `content/_data/about.yml`. Set `author.image` to a path such as `/content/images/author-photo.jpg` and update `author.image_alt` with a short description. Leave `image` blank to show the existing placeholder. The displayed photo automatically crops to the existing frame; the full uploaded file is not altered.

## Updating the other pages

Change `_data/blog.yml`, `_data/archive.yml`, `_data/about.yml`, or `_data/events.yml` to edit their text. Add event objects under `items` in `events.yml` when screenings or talks are scheduled. The Archive listing itself is generated from `_publications/`, so there is no separate list to update. Change `_data/navigation.yml` for the top menu, and `_data/site.yml` for the journal name and credit.

GitHub Pages rebuilds the site when you commit changes to the published branch. The HTML layout templates and technical configuration remain at the repository root because Jekyll needs them there.
