<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 30;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Identity')->schema([
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\FileUpload::make('cover_image')->image()->directory('projects')->maxSize(3072),
                Forms\Components\FileUpload::make('gallery')->image()->multiple()->reorderable()
                    ->directory('projects/gallery')->maxSize(3072),
                Forms\Components\DatePicker::make('completed_at'),
            ])->columns(2),
            Forms\Components\Section::make('Title (bilingual)')->schema([
                Forms\Components\TextInput::make('title.en')->label('Title (EN)')->required()
                    ->live(onBlur: true)->afterStateUpdated(fn ($s, $set) => $set('slug', Str::slug($s))),
                Forms\Components\TextInput::make('title.ar')->label('العنوان (AR)')->required()
                    ->extraInputAttributes(['dir' => 'rtl']),
                Forms\Components\TextInput::make('client_name.en')->label('Client (EN)'),
                Forms\Components\TextInput::make('client_name.ar')->label('العميل (AR)')->extraInputAttributes(['dir' => 'rtl']),
                Forms\Components\TextInput::make('industry.en')->label('Industry (EN)'),
                Forms\Components\TextInput::make('industry.ar')->label('القطاع (AR)')->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Summary')->schema([
                Forms\Components\Textarea::make('summary.en')->label('Summary (EN)')->required()->rows(3),
                Forms\Components\Textarea::make('summary.ar')->label('ملخص (AR)')->required()->rows(3)->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Case study')->schema([
                Forms\Components\RichEditor::make('challenge.en')->label('Challenge (EN)'),
                Forms\Components\RichEditor::make('challenge.ar')->label('التحدي (AR)'),
                Forms\Components\RichEditor::make('solution_text.en')->label('Solution (EN)'),
                Forms\Components\RichEditor::make('solution_text.ar')->label('الحل (AR)'),
            ])->collapsible()->collapsed(),
            Forms\Components\Section::make('Key results')->schema([
                Forms\Components\Repeater::make('results')->schema([
                    Forms\Components\TextInput::make('en')->label('Result (EN)')->required(),
                    Forms\Components\TextInput::make('ar')->label('Result (AR)')->required()->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2)->collapsible(),
            ]),
            Forms\Components\Section::make('Display')->schema([
                Forms\Components\TextInput::make('order')->numeric()->default(0),
                Forms\Components\Toggle::make('is_featured'),
                Forms\Components\Toggle::make('is_published')->default(true),
            ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('cover_image')->square(),
            Tables\Columns\TextColumn::make('title.en')->label('Title')->searchable(),
            Tables\Columns\TextColumn::make('client_name.en')->label('Client'),
            Tables\Columns\TextColumn::make('completed_at')->date()->sortable(),
            Tables\Columns\IconColumn::make('is_featured')->boolean(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->defaultSort('order')
        ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
