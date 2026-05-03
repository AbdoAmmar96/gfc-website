<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 60;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Identity')->schema([
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\FileUpload::make('cover_image')->image()->directory('blog')->maxSize(3072),
                Forms\Components\DatePicker::make('published_at')->default(now()),
            ])->columns(3),
            Forms\Components\Section::make('Title')->schema([
                Forms\Components\TextInput::make('title.en')->label('Title (EN)')->required()
                    ->live(onBlur: true)->afterStateUpdated(fn ($s, $set) => $set('slug', Str::slug($s))),
                Forms\Components\TextInput::make('title.ar')->label('العنوان (AR)')->required()->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Category')->schema([
                Forms\Components\TextInput::make('category.en')->label('Category (EN)'),
                Forms\Components\TextInput::make('category.ar')->label('التصنيف (AR)')->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Excerpt')->schema([
                Forms\Components\Textarea::make('excerpt.en')->label('Excerpt (EN)')->required()->rows(2),
                Forms\Components\Textarea::make('excerpt.ar')->label('المقتطف (AR)')->required()->rows(2)->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Content')->schema([
                Forms\Components\RichEditor::make('content.en')->label('Content (EN)')->required(),
                Forms\Components\RichEditor::make('content.ar')->label('المحتوى (AR)')->required(),
            ]),
            Forms\Components\Toggle::make('is_published')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('cover_image')->square(),
            Tables\Columns\TextColumn::make('title.en')->label('Title')->searchable()->limit(40),
            Tables\Columns\TextColumn::make('category.en')->label('Category'),
            Tables\Columns\TextColumn::make('published_at')->date()->sortable(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->defaultSort('published_at', 'desc')
        ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
