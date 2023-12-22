'use strict'
var fs = require('hexo-fs');
var path = require('path');
const urlFor = require('hexo-util').url_for.bind(hexo)

function autoGallery (args) {
  var relativeDir = args[1];
  var dir = path.join(hexo.source_dir, relativeDir);
  var files = fs.listDirSync(dir);
  var photos = files.map(f => relativeDir  +'/'+ f)
  const { data, languages } = hexo.theme.i18n
  args = args.join(' ').split(',')
  const rowHeight = args[1] || 220
  const limit = args[2] || 10
  const lazyload = args[0] === 'true'
  const regex = /!\[(.*?)\]\((.*?)\s*(?:["'](.*?)["']?)?\s*\)/g
  const lazyloadClass = lazyload ? 'lazyload' : ''
  const arr = []

  photos.forEach(item=>{
    arr.push({
      url: item
    })
  })
  return `<div class="gallery">
    <div class="fj-gallery ${lazyloadClass}" data-rowHeight="${rowHeight}" data-limit="${limit}">
    <span class="gallery-data">${JSON.stringify(arr)}</span>
    </div>
    <button class="gallery-load-more"><span>${data[languages[0]].load_more}</span><i class="fa-solid fa-arrow-down"></i></button>
    </div>`
}


hexo.extend.tag.register('autogallery',autoGallery)
