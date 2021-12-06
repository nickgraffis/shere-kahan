<template>
  <div class="flex-grow overflow-y-scroll overflow-x-hidden">
    <div class="py-6 mx-auto max-w-1xl">
      <div class="space-y-6">
        <div class="flex space-x-5 items-baseline justify-between">
          <img
          v-if="data"
          class="w-20 h-20"
          :src="`
            https://bavel-avatar.netlify.app/api/hello-world?seed=
            ${data?.account.ref['@ref'].id}
          `" 
          />
          <p class="font-bold text-3xl">User Profile</p>
        </div>
        <div class="space-y-2">
          <div>
            <label for="name" class="font-medium text-lg">Name</label>
            <p class="text-sm">Your display name; used for mentions, collaborative editing and attribution.</p>
          </div>
          <input v-if="data" :value="data?.account?.data.name" name="name" class="bg-gray-200 rounded-lg p-2 w-full" />
        </div>
        <div class="space-y-2">
          <div>
            <label for="name" class="font-medium flex space-x-2 items-center text-lg">
              <span>Email</span>
              <div class="text-[9px] px-2 py-1 rounded-sm bg-rose-500 text-white font-semibold">
                UNVERIFIED
              </div>
            </label>
            <p class="text-sm">Your email address is important to reset your password. We don't send you any spam emails, and adjust your notification settings if you don't want any emails.</p>
          </div>
          <input v-if="data" :value="data?.account?.data.email" name="name" class="bg-gray-200 rounded-lg p-2 w-full" />
          <p class="font-semibold text-blue-500">Send email verification link.</p>
        </div>
        <div class="space-y-2">
          <div>
            <label for="name" class="font-medium">Birthdate</label>
            <p class="text-sm">Seems invasive? No need to respond, but it's always fun to get a happy birthday!</p>
          </div>
          <div class="birthday">
    <div ref="icon" class="icon">
        <div ref="normal" class="normal">
            <svg viewBox="0 0 36 36" class="cake-smoke" fill="none" stroke="currentColor">
                <path d="M18 11C18 11 18.832 7.48792 20.25 7C20.8172 6.80483 21.1828 7.19517 21.75 7C23.168 6.51208 24 3 24 3"/>
                <path d="M17 8C17 8 16.0731 6.29007 15.2857 6C14.849 5.8391 14.5663 6.24699 14.1429 6C13.1961 5.44772 13 2 13 2"/>
                <path d="M18.0916 5C18.0916 5 17.8855 4.20779 18.0916 3.71429C18.3987 2.97862 20 2 20 2"/>
            </svg>
        </div>
        <div ref="zodiac" class="zodiac">
          <div v-for="(name, index) in zodiacs">
            <div :class="name" :style="{'offset': index * -24 + 'px' }"></div>
          </div>
        </div>
    </div>
    <input ref="month" type="text" class="month" placeholder="MM" maxlength="2" pattern="\d*">
    <span>/</span>
    <input ref="day" type="text" class="day" placeholder="DD" maxlength="2" pattern="\d*">
    <span>/</span>
    <input ref="year" type="text" class="year" placeholder="YYYY" maxlength="4" pattern="\d*">
</div>

<div class="log"></div>

<!-- SVG Assets -->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol viewBox="0 0 36 36" id="cake-light" fill="currentColor">
        <path d="M21 10.5C21 12.1569 19.6569 13.5 18 13.5C16.3431 13.5 15 12.1569 15 10.5C15 8.84315 18 3.5 18 3.5C18 3.5 21 8.84315 21 10.5Z"/>
    </symbol>
    <symbol viewBox="0 0 36 36" id="cake" fill="currentColor">
        <path d="M19.5 14V14C19.2793 12.2344 16.7207 12.2344 16.5 14V14C11.25 14.3 6 15.95 6 19.25V23.75C6 27.35 12.15 29 18 29C23.85 29 30 27.35 30 23.75V19.25C30 15.95 24.75 14.3 19.5 14ZM16.5 17V18.5C16.5 19.4 17.1 20 18 20C18.9 20 19.5 19.4 19.5 18.5V17C24.15 17.3 26.7 18.65 27 19.25C26.7 19.85 23.7 21.5 18 21.5C12.3 21.5 9.15 19.85 9 19.25C9.15 18.65 11.7 17.3 16.5 17Z"/>
    </symbol>
</svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from "vue";
import { useToken } from "../hooks/useTokens";

const { data } = useToken()
const zodiac = ref<HTMLElement | null>(null)
const icon = ref<HTMLElement | null>(null)
const normal = ref<HTMLElement | null>(null)
const month = ref<HTMLInputElement | null>(null)
const day = ref<HTMLInputElement | null>(null)
const year = ref<HTMLInputElement | null>(null)

const zodiacs = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

function getZodiac(day, month) {
    let zodiac = [''].concat(zodiacs).concat([zodiacs[0]]),
        last = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (parseInt(day) > last[parseInt(month)]) ? zodiac[parseInt(month) * 1 + 1] : zodiac[parseInt(month)];
}

const onMonthChange = (e) => {
  if(e.key > 1 && !e.target.value.length && e.keyCode != 37 && e.keyCode != 39) {
      e.target.value = '0' + e.key;
      // triggerInput(month);
      // setTimeout(() => nextInput(month).focus(), 50);
  }
}

function createSVG(id) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + id);
    svg.appendChild(use);
    svg.classList.add(id);
    return svg;
}

function prevInput(el) {
    let input = el.previousElementSibling ? el.previousElementSibling.previousElementSibling : null;
    return (input && input.tagName == 'INPUT') ? input : el;
}

function nextInput(el) {
    let input = el.nextElementSibling ? el.nextElementSibling.nextElementSibling : null;
    return (input && input.tagName == 'INPUT') ? input : el;
}

function pad(n) {
    return (n < 10) ? ('0' + n) : n;
}

['cake-light', 'cake'].forEach(name => normal.value?.appendChild(createSVG(name)));



</script>

<style lang="css" scoped>
.birthday {
	 --background: #fff;
	 --border: #e6e7ee;
	 --border-width: 1px;
	 --border-focus: #07f;
	 --border-focus-width: 2px;
	 --text: #00104b;
	 --text-placeholder: #999fb7;
	 --default: #07f;
	 --smoke: var(--text-placeholder);
	 --error: #ff5252;
	 border-radius: 8px;
	 position: relative;
	 display: flex;
	 align-items: center;
	 background: var(--background);
	 box-shadow: inset 0 0 0 var(--border-width) var(--border);
	 transition: box-shadow 0.3s;
}
 .birthday .icon, .birthday .icon svg {
	 width: 24px;
	 height: 24px;
	 position: absolute;
}
 .birthday .icon {
	 top: 12px;
	 left: 12px;
}
 .birthday .icon svg {
	 top: 0;
	 left: 0;
	 opacity: var(--o, 1);
	 transform: scale(var(--s, 0));
	 color: var(--c, var(--default));
	 transition: color 0.3s, transform 0.2s, opacity 0.2s;
}
 .birthday .icon .normal {
	 opacity: var(--o, 1);
	 transform: scale(var(--s, 1));
	 transition: transform 0.2s, opacity 0.2s;
}
 .birthday .icon .normal svg.cake-smoke {
	 --s: 1;
	 --c: var(--smoke);
}
 .birthday .icon .normal svg.cake-smoke path {
	 --size: 11px;
	 stroke-dasharray: var(--size);
	 stroke-dashoffset: var(--offset, calc(var(--size) * 3));
	 transition: stroke-dashoffset var(--d, 0s);
}
 .birthday .icon .normal svg.cake-smoke path:nth-child(2) {
	 --size: 8px;
}
 .birthday .icon .normal svg.cake-smoke path:nth-child(3) {
	 --size: 4px;
}
 .birthday .icon .normal svg.cake-light {
	 --s: 1;
}
 .birthday .icon .normal svg.cake {
	 --s: 1;
}
 .birthday .icon .zodiac div {
	 width: 24px;
	 height: 24px;
	 position: absolute;
	 left: 0;
	 top: 0;
	 background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/165585/zodiac-signs-sprite%402x.png');
	 background-size: auto 24px;
	 background-position: var(--offset) 0;
	 opacity: var(--o, 0);
	 transform: scale(var(--s, 0.6));
	 transition: transform 0.2s, opacity 0.2s;
}
 .birthday input {
	 -webkit-appearance: none;
	 background: none;
	 border: none;
	 outline: none;
	 text-align: center;
	 font-family: inherit;
	 font-size: 16px;
	 margin: 0;
	 line-height: 24px;
	 padding: 12px var(--r, 0) 12px var(--l, 0);
	 width: var(--w, 22px);
	 color: var(--text);
}
 .birthday input:first-of-type {
	 --w: 72px;
	 --l: 44px;
}
 .birthday input:last-of-type {
	 --w: 64px;
	 --r: 24px;
}
 .birthday input::placeholder {
	 font-size: 15px;
	 color: var(--text-placeholder);
}
 .birthday span {
	 display: block;
	 opacity: 0.4;
	 margin: -1px 3px 0 3px;
	 color: var(--text-placeholder);
}
 .birthday .error-message {
	 position: absolute;
	 top: 100%;
	 left: 50%;
	 white-space: nowrap;
	 font-size: 14px;
	 font-weight: 500;
	 opacity: var(--o, 0);
	 color: var(--error);
	 transition: opacity 0.2s, transform 0.2s;
	 transform: translate(-50%, 4px) scale(var(--s, 0.8));
}
 .birthday .error-message.show {
	 --s: 1;
	 --o: 1;
}
 .birthday:focus-within {
	 --border: var(--border-focus);
	 --border-width: var(--border-focus-width);
}
 .birthday:not(.error) .icon .normal.hide {
	 --o: 0;
	 --s: 0.6;
}
 .birthday:not(.error) .icon .zodiac .show {
	 --o: 1;
	 --s: 1;
}
 .birthday.error {
	 --border: var(--error);
	 --border-width: var(--border-focus-width);
}
 .birthday.error .icon .normal {
	 --c: var(--error);
}
 .birthday.error .icon .normal svg.cake-smoke path {
	 --d: 0.6s;
	 --offset: var(--size);
}
 .birthday.error .icon .normal svg.cake-light {
	 --s: 0;
}
 html {
	 box-sizing: border-box;
	 -webkit-font-smoothing: antialiased;
}
 * {
	 box-sizing: inherit;
}
 *:before, *:after {
	 box-sizing: inherit;
}
 body {
	 min-height: 100vh;
	 display: flex;
	 font-family: 'Roboto', Arial;
	 justify-content: center;
	 align-items: center;
	 flex-direction: column;
	 background: #fafafb;
}
 body .dribbble {
	 position: fixed;
	 display: block;
	 right: 20px;
	 bottom: 20px;
}
 body .dribbble img {
	 display: block;
	 height: 28px;
}
 body .twitter {
	 position: fixed;
	 display: block;
	 right: 64px;
	 bottom: 14px;
}
 body .twitter svg {
	 width: 32px;
	 height: 32px;
	 fill: #1da1f2;
}
 
 </style>