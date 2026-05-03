<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SolutionResource\Pages;
use App\Models\Solution;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class SolutionResource extends Resource
{
    protected static ?string $model = Solution::class;
    protected static ?string $navigationIcon = 'heroicon-o-light-bulb';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 20;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Identity')->schema([
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('icon')->helperText('lucide-react icon name'),
                Forms\Components\FileUpload::make('image')->image()->directory('solutions')->maxSize(2048),
            ])->columns(3),
            Forms\Components\Section::make('Title')->schema([
                Forms\Components\TextInput::make('title.en')->label('Title (EN)')->required()
                    ->live(onBlur: true)->afterStateUpdated(fn ($s, $set) => $set('slug', Str::slug($s))),
                Forms\Components\TextInput::make('title.ar')->label('العنوان (AR)')->required()
                    ->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Short description')->schema([
                Forms\Components\Textarea::make('short_description.en')->label('EN')->required()->rows(2),
                Forms\Components\Textarea::make('short_description.ar')->label('AR')->required()->rows(2)
                    ->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Full description')->schema([
                Forms\Components\RichEditor::make('description.en')->label('EN')->required(),
                Forms\Components\RichEditor::make('description.ar')->label('AR')->required(),
            ]),
            Forms\Components\Section::make('Benefits')->schema([
                Forms\Components\Repeater::make('benefits')->schema([
                    Forms\Components\TextInput::make('en')->required(),
                    Forms\Components\TextInput::make('ar')->required()->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2)->collapsible(),
            ]),
            Forms\Components\Section::make('Display')->schema([
                Forms\Components\TextInput::make('order')->numeric()->default(0),
                Forms\Components\Toggle::make('is_published')->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')->circular(),
                Tables\Columns\TextColumn::make('title.en')->label('Title')->searchable(),
                Tables\Columns\TextColumn::make('slug')->color('gray'),
                Tables\Columns\TextColumn::make('order')->sortable(),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
            ])
            ->defaultSort('order')
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSolutions::route('/'),
            'create' => Pages\CreateSolution::route('/create'),
            'edit' => Pages\EditSolution::route('/{record}/edit'),
        ];
    }
}
