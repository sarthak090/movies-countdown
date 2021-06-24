# Movies Countdown
This is a Project created with next js and tmdb api to show list of all the upcoming movies this year with countdown


Check out live demo at [Movies Countdown](https://movies-countdown.vercel.app) for more details.
## Features
- Build With Tailwind CSS so you can customize this as per your requirement
- All Pages Are statically generated 
- Custom Hook is implemented for resusability
- Image is optimized with ``next/image`` for optimization
- SEO is included
- Dynamic sitemap is included at `/api/sitemap_movies`  or `/sitemap.xml`
- robots.txt file is included


## Setup 

- Clone the repo 
- Run ``yarn install`` to install all the required packages
- Get Tmdb api from there website
- Paste that api in ``.env`` file with name of NEXT_TMDB_API
- Uncomment NEXT_PUBLIC_DOMAIN_NAME variable in ``.env`` file
  
## Running the server 



```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

