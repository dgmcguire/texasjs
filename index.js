import {Socket} from "phoenix"
import $ from "jquery"
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import VNode from 'virtual-dom/vnode/vnode'
import VText from 'virtual-dom/vnode/vtext'
import htmlToVdom from 'html-to-vdom'

var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

let socket = new Socket("/socket", {params: {token: window.userToken}})
socket.connect()

// Now that you are connected, you can join channels with a topic:
//let channel = socket.channel("view_state:lobby", {})
//channel.join()
  //.receive("ok", resp => { console.log("Joined successfully", resp) })
  //.receive("error", resp => { console.log("Unable to join", resp) })


//var oldHtml = document.getElementById("chat");

//$("form").on( "submit", function( event ) {
  //event.preventDefault();
  //channel.push("html", {query: $(event.target).serialize()});
//});

channel.on("html", function(message){
  var oldTree = convertHTML(oldHtml.outerHTML);
  var newHtml = message.message.split("\n").join("").trim();
  var newTree = convertHTML(newHtml);
  var patchz = diff(oldTree, newTree);
  console.log( patchz );
  oldHtml = patch(oldHtml, patchz);
  var objDiv = document.getElementById("chatbox");
  objDiv.scrollTop = objDiv.scrollHeight;
  $("form").on( "submit", function( event ) {
    event.preventDefault();
    channel.push("html", {query: $(event.target).serialize()});
  });
});

export default texas
