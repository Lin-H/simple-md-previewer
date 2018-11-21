#![windows_subsystem = "windows"]

extern crate web_view;

use web_view::*;

fn main() {
    WebViewBuilder::new()
        .title("Markdown")
        .content(Content::Html(include_str!("../html/dist/bundle.html")))
        .size(800, 600)
        .resizable(true)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, _arg| Ok(()))
        .build()
        .unwrap()
        .run()
        .unwrap();
}
