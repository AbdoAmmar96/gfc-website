<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube-transparent';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Identity')
                ->schema([
                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->helperText('URL-friendly identifier, e.g. network-infrastructure'),
                    Forms\Components\TextInput::make('icon')
                        ->helperText('lucide-react icon name, e.g. network, shield, cloud, server'),
                    Forms\Components\FileUpload::make('image')
                        ->image()
                        ->imageEditor()
                        ->directory('services')
                        ->maxSize(2048),
                ])->columns(2),

            Forms\Components\Section::make('Title (bilingual)')
                ->schema([
                    Forms\Components\TextInput::make('title.en')
                        ->label('Title (English)')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                    Forms\Components\TextInput::make('title.ar')
                        ->label('العنوان (عربي)')
                        ->required()
                        ->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

            Forms\Components\Section::make('Short description (bilingual)')
                ->description('Shown on cards and previews')
                ->schema([
                    Forms\Components\Textarea::make('short_description.en')
                        ->label('Short description (English)')
                        ->required()
                        ->rows(2),
                    Forms\Components\Textarea::make('short_description.ar')
                        ->label('وصف مختصر (عربي)')
                        ->required()
                        ->rows(2)
                        ->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

            Forms\Components\Section::make('Full description (bilingual)')
                ->schema([
                    Forms\Components\RichEditor::make('description.en')
                        ->label('Description (English)')
                        ->required(),
                    Forms\Components\RichEditor::make('description.ar')
                        ->label('الوصف الكامل (عربي)')
                        ->required(),
                ]),

            Forms\Components\Section::make('Features')
                ->description('Key feature bullets shown on the service detail page')
                ->schema([
                    Forms\Components\Repeater::make('features')
                        ->schema([
                            Forms\Components\TextInput::make('en')->label('English')->required(),
                            Forms\Components\TextInput::make('ar')->label('عربي')->required()
                                ->extraInputAttributes(['dir' => 'rtl']),
                        ])
                        ->columns(2)
                        ->collapsible()
                        ->addActionLabel('Add feature'),
                ]),

            Forms\Components\Section::make('SEO')
                ->collapsed()
                ->schema([
                    Forms\Components\TextInput::make('meta_title.en')->label('Meta title (EN)'),
                    Forms\Components\TextInput::make('meta_title.ar')->label('Meta title (AR)')
                        ->extraInputAttributes(['dir' => 'rtl']),
                    Forms\Components\Textarea::make('meta_description.en')->label('Meta description (EN)')->rows(2),
                    Forms\Components\Textarea::make('meta_description.ar')->label('Meta description (AR)')->rows(2)
                        ->extraInputAttributes(['dir' => 'rtl']),
                ])->columns(2),

            Forms\Components\Section::make('Display')
                ->schema([
                    Forms\Components\TextInput::make('order')->numeric()->default(0),
                    Forms\Components\Toggle::make('is_featured')->default(false),
                    Forms\Components\Toggle::make('is_published')->default(true),
                ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')->circular(),
                Tables\Columns\TextColumn::make('title.en')->label('Title (EN)')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('title.ar')->label('العنوان')->searchable(),
                Tables\Columns\TextColumn::make('slug')->copyable()->color('gray'),
                Tables\Columns\TextColumn::make('order')->sortable(),
                Tables\Columns\IconColumn::make('is_featured')->boolean(),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published'),
                Tables\Filters\TernaryFilter::make('is_featured'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
