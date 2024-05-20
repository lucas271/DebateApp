<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    //    public function createNews(Request $request){
        
    public function createNews(Request $request){ 
        $validatedData = Validator::make($request->all(), [
            'title' => 'required',
            'text' => 'required',
            'writer_id' => 'required'
        ], [
            'title.required' => 'You must fill the title field.',
            'text.required' => 'You must fill the text field.',
            'writer_id.required' => 'You must be a writer to create news.'
        ]);

        if($validatedData->fails()){
            return response()->json(['error' => $validatedData->errors()], 400);
        }

        $news = News::create($validatedData);

        return response()->json(['data' => $news]);
    }
}
