<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function create()
    {
         // 画像一覧を取得
         $images = \App\Image::get();
         return view('image', [
             'images' =>  $images,   
         ]);
    }

    public function store(Request $request)
    {
        // 画像を保存
        $path = \Storage::putFile('public', $request->file);
        // DBに追加
        \App\Image::create(['path' => $path]);
        // 一旦元の画面に戻る
        return redirect()->route('image.create');
    }

    public function update(Request $request, \App\Image $image)
    {
        // 更新前の画像削除
        \Storage::delete($image->path);
        // 更新後の画像追加
        $path = \Storage::putFile('public', $request->file);
        $image->fill(['path' => $path])->save();
        return redirect()->route('image.create');
    }

    public function destroy(\App\Image $image)
    {
        // 画像の削除
        \Storage::delete($image->path);
        // レコードの削除
        $image->delete();
        return redirect()->route('image.create');
    }
}