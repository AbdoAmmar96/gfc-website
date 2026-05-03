<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\TeamMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 50;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\FileUpload::make('photo')->image()->avatar()->directory('team')->maxSize(2048),
            Forms\Components\Section::make('Name')->schema([
                Forms\Components\TextInput::make('name.en')->label('Name (EN)')->required(),
                Forms\Components\TextInput::make('name.ar')->label('الاسم (AR)')->required()->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Position')->schema([
                Forms\Components\TextInput::make('position.en')->label('Position (EN)')->required(),
                Forms\Components\TextInput::make('position.ar')->label('المنصب (AR)')->required()->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\Section::make('Bio')->schema([
                Forms\Components\Textarea::make('bio.en')->label('Bio (EN)')->rows(3),
                Forms\Components\Textarea::make('bio.ar')->label('السيرة (AR)')->rows(3)->extraInputAttributes(['dir' => 'rtl']),
            ])->columns(2),
            Forms\Components\TextInput::make('linkedin')->url()->prefix('https://'),
            Forms\Components\TextInput::make('email')->email(),
            Forms\Components\TextInput::make('order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_published')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('photo')->circular(),
            Tables\Columns\TextColumn::make('name.en')->label('Name')->searchable(),
            Tables\Columns\TextColumn::make('position.en')->label('Position'),
            Tables\Columns\TextColumn::make('order')->sortable(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->defaultSort('order')
        ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit' => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}
