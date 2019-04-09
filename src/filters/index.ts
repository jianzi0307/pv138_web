import Vue from 'vue';

function gender(str: string) {
    if (str === 'female') {
        return '女生'
    } else if (str === 'male') {
        return '男生'
    }
}

Vue.filter('gender', gender);
