"use strict"

// register the application module
b4w.register("final_chapter_main", function(exports, require) {

// import modules used by the app
const m_app       = require("app");
const m_cfg       = require("config");
const m_data      = require("data");
const m_preloader = require("preloader");
const m_ver       = require("version");
const lights      = require("lights");
const m_mouse     = require("mouse");
const m_cam       = require("camera");
const m_scenes    = require("scenes");
//const m_input     = require("input");

// detect application mode
const DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
const APP_ASSETS_PATH = m_cfg.get_assets_path("final_chapter");
    
let canvas_e;
let x_old;
let y_old;
let x_tran;
let y_tran;
    
/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true,
        quality: m_cfg.P_ULTRA
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();
    
    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
    
    canvas_e = canvas_elem;

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "final_chapter.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // place your code here
    
    lights.set_day_time(18.2);
    
    canvas_e.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const x = m_mouse.get_coords_x(e);
        const y = m_mouse.get_coords_y(e);
        m_cam.translate_view(camera, 0, 0, 0)
        x_old = x;
        y_old = y;
        x_tran = 0;
        y_tran = 0;
        return false;
    };
    
    const camera = m_scenes.get_active_camera();
    
    canvas_e.addEventListener("mousemove", function(event) {
        const x = m_mouse.get_coords_x(event);
        const y = m_mouse.get_coords_y(event);
        if (x_old == null || y_old == null) {
            x_old = x;
            y_old = y;
            x_tran = 0;
            y_tran = 0;
        } else {
            m_cam.translate_view(camera, x_tran, y_tran, 0);
            x_tran = x_tran + (x - x_old)/1000;
            y_tran = y_tran + (y_old - y)/1000;
            x_old = x;
            y_old = y;
        }

    });

}


});

// import the app module and start the app by calling the init method
b4w.require("final_chapter_main").init();