let stylesheet = document.styleSheets[0];

// * Finding the articles
let articles = document.querySelectorAll('.articleText');

// * Recording their height
let articlesHeight = [];
for (item of articles) {
    articlesHeight.push(item.offsetHeight);
}

// * Giving them css rules
    for (i=0;i<articles.length;i++) {
        articles[i].id = `id${i}`;
        stylesheet.insertRule(`.articleText#id${i}{height:0px}`, 0);
    }
// * Recording them rules
    let articlesRules = [];
    for (i=0;i<articles.length;i++) {
        for (rule of stylesheet.cssRules) {
            if (rule.selectorText == `.articleText#id${i}`) articlesRules.push(rule);
        }
    }



const showIt = (elementRule, id) => {
    elementRule.style.opacity = 1;
    elementRule.style.height = `${articlesHeight[id] + 40}px`;
    elementRule.style.transform = `scaleY(1)`;
    elementRule.style.paddingTop = `20px`;
}
const hideIt = (elementRule) => {
    elementRule.style.opacity = 0;
    elementRule.style.height = `0px`;
    elementRule.style.transform = `scaleY(0)`;
    elementRule.style.paddingTop = `0px`;
}
let svgList = document.querySelectorAll('.vertical');

let test = document.querySelector('#svg0');
test.addEventListener('click', () => {
    test.children[0].children[0].classList.add('shrinkVertical');
});

window.addEventListener('click', (e) => {
    let target = e.composedPath();
    if (target[0].nodeName == "H2" && target[1].classList[0] == "heading") {
        let id = target[0].parentElement.parentElement.children[1].id;
        let idNumber = id.slice(2, id.length);
        let targetRule = articlesRules[idNumber];
        if(targetRule.style.opacity == 0) {
            target[0].parentElement.parentElement.children[1].classList.add('showing');
            showIt(targetRule, idNumber);
            svgList[idNumber].classList.add('shrinkVertical');
            for (i=0;i<articlesRules.length;i++) {
                if (i != idNumber) {
                    hideIt(articlesRules[i]);
                    svgList[i].classList.remove('shrinkVertical');
                }
            }
        } else {
            target[0].nextElementSibling.children[0].children[0].classList.remove('shrinkVertical');
            target[0].parentElement.parentElement.children[1].classList.remove('showing');
            hideIt(targetRule);
        }
    }
});

let input = document.querySelector('.searchInput');
input.addEventListener('input', () => {
    if (input.value.length >= 3) {
        let unmatched = [];
        for (item of articles) {
            if (item.textContent.search(input.value) != -1) {
                console.log(`matched with ${item.id}`);
                item.parentElement.classList.remove('disapear');
                item.parentElement.classList.remove('beGone');
            } else {
                unmatched.push(item);
            }
        }
        for (let i=0;i<unmatched.length;i++) {
            unmatched[i].parentElement.classList.add('disapear');
            setTimeout(() => {
                console.log(unmatched[i]);
                unmatched[i].parentElement.classList.add('beGone');
            }, 500);
        }
    } else {
        for (item of articles) {
            item.parentElement.classList.remove('disapear');
            item.parentElement.classList.remove('beGone');
        }
    }
});

/* let faq = document.querySelector('.faq');
faq.classList.toggle('disapear');
setTimeout(() => {
    faq.classList.toggle('beGone');
}, 500); */


