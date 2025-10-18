
  # Modern Footwear Landing Page

  This is a code bundle for Modern Footwear Landing Page. The original project is available at https://www.figma.com/design/bl70wcmDUhtiZxvkK3JiMd/Modern-Footwear-Landing-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

git add folder name / file name  folder name / file name  
git commit -m "changed"
git push origin master
npm run build

After running npm run build

cd dist
git init
git add -A
git commit -m "Deploy.."
git branch -M master
git remote add origin https://github.com/fariofootwear-star/fariowebsite.git
git push -f origin master:gh-pages
cd ..