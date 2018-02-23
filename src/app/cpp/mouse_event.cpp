#include <stdio.h>      // for 'printf' function
#include <string.h>     // for 'strlen' function
#include <emscripten.h> // for 'strlen' function
using namespace std;

extern "C" {
float translate_x(int x, int width)
{
    float tr_x = x - width / 2;
    tr_x = tr_x / 1000;
    // printf("%f\n", tr_x);
    return tr_x;
}
float translate_y(int y, int height)
{
    float tr_y = (height / 2 - y);
    tr_y = tr_y / 1000;
    // printf("%d %d %d\n", y, height, tr_y);
    return tr_y;
}
}