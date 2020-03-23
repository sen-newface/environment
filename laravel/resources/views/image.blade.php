<!DOCTYPE html>
<meta charset="utf-8">
<title>Image Uploder</title>
<form method="post" action="{{ route('image.store') }}" enctype="multipart/form-data">
  @csrf
  Image
　<input type="file" name="file" accept="image/*" required>
  <button type="submit">Upload</button>
</form>
@foreach ($images as $image)
  <div style="margin: 10px;border: 1px solid;width:50%;">
    <img src="{{ \Storage::url($image->path) }}" style="width:250px"><br>
    id: {{ $image->id }}<br>
    Updated: {{ $image->updated_at }}<br>
    <form method="post" action="{{route('image.update', $image)}}" enctype="multipart/form-data">
      @csrf
      @method('PUT')
      Image<input type="file" name="file" accept="image/*" required>
      <button type="submit">Update</button>
    </form>
    <form method="post" action="{{route('image.destroy', $image)}}">
      @csrf
      @method('DELETE')
      <button type="submit">Delete</button>
    </form>
  </div>
@endforeach